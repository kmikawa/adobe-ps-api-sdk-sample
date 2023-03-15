# Adobe DI SDK Beta (Example)

## Preparation

#### Create Photoshop API credential

1. [Sing up](https://developer.adobe.com/photoshop/api/signup/?ref=signup) to create a credential in order to use Photoshop API. When creating a credential, a zip file (*config.zip*) will be automatically downloaded. It contains your private key (*private.key*).  Please store the private key securely, since Adobe does not retain a copy of it.

#### Prepare Storage

AWS

1. [Create AWS accont](https://docs.aws.amazon.com/rekognition/latest/dg/setting-up.html)
1. Set up AWS CLI
   1. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   1. Configure [AWS CLI options](https://docs.aws.amazon.com/cli/latest/reference/:configure/): `aws configure`
   1. Test AWS CLI: `aws s3 ls` to list S3 objects

#### Download this project

1. Clone this project: `git clone https://github.com/kmikawa/adobe-ps-api-sdk-sample.git`
1. Install node modules: `npm install`
1. Unzip your downloaded *config.zip* and save `private.key` as `config/private.key` in this project
1. Save `config/config-template.js` as `config/config.js`
1. Fill the following configuration in `config/config.js`, save, and close.
```
const adobeConfig = {
  clientId: "",
  clientSecret: "",
  technicalAccountId: "",
  orgId: "",
  metaScopes: ["ent_ccas_sdk"],
};
```
```
const awsConfig = {
  region: "", // us-east-1
  bucketName: "" // aws s3 bucket name
}
```

## Run sample script
#### Run a sample script (src/sample/psapi/...)
1. Run a sample
```
node src/sample/psapi/01_createCutout.js
```
2. Find your output file in your S3 storage, output directory (ex: s3://<awsConfig.bucketName>/output/...)

#### Run a sample scrip for a batch job (src/sample/batch_script/...)
1. Store multiple JPEG files in your S3 storage (ex: s3://<awsConfig.bucketName>/input/...) or modify input/output directories in the sample script.
2. Run a sample
```
node src/sample/batch_job/01_createCutout_batch.js
```
3. Find your output files in your S3 storage, output directory (ex: s3://<awsConfig.bucketName>/input/output/...)
* You can also use AWS CLI to sync files from your S3 storage into your local machine (ex: `aws s3 sync s3://<awsConfig.bucketName>/input/output/ /Users/<username>/Desktop/output/`)

#### Run a sample scrip for chain batch jobs (src/sample/batch_script/remove-background-batch.js)
* This sample script requires actionJSON endpoint
1. Store multiple JPEG files in your S3 storage (ex: s3://<awsConfig.bucketName>/input/...) or modify input/output directories in `src/sample/batch_job/remove-background-batch.js`
2. Run a sample
```
node src/sample/batch_job/remove-background-batch.js
```
3. Find your output files in your S3 storage, output directory (ex: s3://<awsConfig.bucketName>/input/output/...)
* You can also use AWS CLI to sync files from your S3 storage into your local machine (ex: `aws s3 sync s3://<awsConfig.bucketName>/input/output/ /Users/<username>/Desktop/output/`)

#### [OPTIONAL] To use actionJSON endpoint

1. Change `"/pie/psdService/photoshopActions"` to `"/pie/psdService/actionJSON"` in node_modules/@adobe/aio-lib-photoshop-api/spec/api.json

## Links

- [Photoshop API documentation](https://developer.adobe.com/photoshop/photoshop-api-docs/api/)
- [Demo](https://developer.adobe.com/photoshop/api/)
- [Curl command examples](https://developer.adobe.com/photoshop/photoshop-api-docs/code-sample/)
- [Create a credential](https://developer.adobe.com/photoshop/api/signup/?ref=signup)
- [Supported Features](https://developer.adobe.com/photoshop/photoshop-api-docs/features/)
- [Submit a ticket for support or feedback](https://psd-services.zendesk.com/hc/en-us/requests/new)

<!-- 

#### [OPTIONAL] To use actionJSON

1. Change `"/pie/psdService/photoshopActions"` to `"/pie/psdService/actionJSON"` in node_modules/@adobe/aio-lib-photoshop-api/spec/api.json

#### [OPTIONAL] Refine Results

1. npx webpack ./src/component/s3.js --mode development --target web --no-devtool -o ./public
// node s3.js

1. open public/index.html

#### [OPTIONAL] Create your node project from scratch

1. npm init

1. npm install @adobe/aio-lib-photoshop-api
   https://github.com/adobe/aio-lib-photoshop-api

1. npm install @adobe/jwt-auth
   https://www.npmjs.com/package/@adobe/jwt-auth

1. npm install aws-sdk
   https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/installing-jssdk.html

-->