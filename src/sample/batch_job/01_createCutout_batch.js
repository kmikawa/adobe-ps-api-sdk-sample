// -------------------------------------------------
// Enter your input and output directories in S3
// -------------------------------------------------
const inputDir = 'input/' //your input directory in S3 bucket (ex: s3://<awsConfig.bucketName>/input)
const outputDir = 'output' //your output directory in S3 bucket (ex: s3://<awsConfig.bucketName>/input/output)
// -------------------------------------------------

const awsFunctions = require('../../lib/awsFunctions')
const disdk = require('../../../config/config')
const actionJsonFunctions = require('../../lib/actionJsonFunctions')
const path = require('path');
const fs = require('fs')
let client

main()

async function main() {
  client = await disdk.initSDK()
  const inputs = await awsFunctions.listObjects(inputDir)
  console.log(`${inputs.Contents.length} input files`)
  inputs.Contents.forEach( async content => {
    console.debug(` content: ${content.Key}`)
    const inputSingedUrl = await awsFunctions.getSignedUrl('getObject', content.Key)
    const outputSingedUrl = await awsFunctions.getSignedUrl('putObject', `${path.parse(content.Key).dir}/${outputDir}/${path.parse(content.Key).name}.png`)
    createCutout(inputSingedUrl, outputSingedUrl, content)
  })
}

async function createCutout(inputSingedUrl, outputSingedUrl, content) {
  try {
    const input = {
      href: inputSingedUrl,
      storage: disdk.sdk.Storage.EXTERNAL,
    }
    const output = {
      href: outputSingedUrl,
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PNG
    }
    const job = await client.createCutout(input, output)
    console.log(`${job.isDone()} - ${job.jobId}`)
    // console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}