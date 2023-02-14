// *************************************************************************************
// Your Configuration
// *************************************************************************************
// AWS configuration
const awsConfig = {
  region: "", // us-east-1
  identityPoolId: "", // IDENTITY_POOL_ID e.g., eu-east-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx
  bucketName: "" // aws s3 bucket name
}
// https://developer.adobe.com/console/projects -> project -> Service Account (JWT)
const adobeConfig = {
  clientId: "",
  clientSecret: "",
  technicalAccountId: "",
  orgId: "",
  metaScopes: ["ent_ccas_sdk"],
};
// *************************************************************************************



const sdk = require('@adobe/aio-lib-photoshop-api') // https://github.com/adobe/aio-lib-photoshop-api
const auth = require("@adobe/jwt-auth") // https://www.npmjs.com/package/@adobe/jwt-auth
const fs = require("fs")
const path = require('path');

async function getToken() {
    adobeConfig.privateKey = fs.readFileSync(`${__dirname}/private.key`)
    const token = await auth(adobeConfig)
    return token.access_token
}

async function initSDK() {
  const token = await getToken()
  return await sdk.init(adobeConfig.orgId, adobeConfig.clientId, token)
}

module.exports = {
  awsConfig,
  sdk,
  getToken,
  initSDK
}