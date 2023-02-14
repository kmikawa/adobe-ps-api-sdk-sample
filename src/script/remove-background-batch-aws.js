// -------------------------------------------------
// Enter your input and output directories in s3
// -------------------------------------------------
const inputDir = 'input/' //your input directory in s3 bucket
const outputDir = 'output' //your output directory in s3 bucket
// -------------------------------------------------
const awsFunctions = require('../lib/awsFunctions')
const actionJsonFunctions = require('../lib/actionJsonFunctions')
const disdk = require('../../config/config.js')
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
    const outputSingedUrl = await awsFunctions.getSignedUrl('putObject', `${path.parse(content.Key).dir}/${outputDir}/${path.parse(content.Key).name}-mask.png`)
    createMask(inputSingedUrl, outputSingedUrl, content)
  })
}

async function createMask(inputSingedUrl, outputSingedUrl, content) {
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
    const job = await client.createMask(input, output)
    console.log(`${job.isDone()} - ${job.jobId}`)

    const actionJob = await runPhotoshopActions(input, output, content)
  } catch (e) {
    console.error(e)
  }
}

async function runPhotoshopActions(input, mask, content) {
  try {
    const maskSingedUrl = await awsFunctions.getSignedUrl('getObject', `${path.parse(content.Key).dir}/${outputDir}/${path.parse(content.Key).name}-mask.png`)
    const outputPsdSingedUrl = await awsFunctions.getSignedUrl('putObject', `${path.parse(content.Key).dir}/${outputDir}/${path.parse(content.Key).name}.psd`)
    const outputPngSingedUrl = await awsFunctions.getSignedUrl('putObject', `${path.parse(content.Key).dir}/${outputDir}/${path.parse(content.Key).name}.png`)

    const actionJson = []
    actionJsonFunctions.setActionJsonPref().forEach( obj => {
      actionJson.push(obj)
    })
    actionJsonFunctions.setActionJsonMask().forEach( obj => {
      actionJson.push(obj)
    })
    actionJsonFunctions.setSelectLayer().forEach( obj => {
      actionJson.push(obj)
    })
    actionJsonFunctions.setAutoTone().forEach( obj => {
      actionJson.push(obj)
    })
    actionJsonFunctions.setAutoContrast().forEach( obj => {
      actionJson.push(obj)
    })
    actionJsonFunctions.setAutoColor().forEach( obj => {
      actionJson.push(obj)
    })
    actionJsonFunctions.setActionJsonCanvasSize(2048.0, 2048.0, 'center', 'top').forEach( obj => {
      actionJson.push(obj)
    })

    const job = await client.applyPhotoshopActions(
      input,
      [
        {
          href: outputPsdSingedUrl,
          storage: disdk.sdk.Storage.EXTERNAL,
          type: disdk.sdk.MimeType.PSD
        },
        {
          href: outputPngSingedUrl,
          storage: disdk.sdk.Storage.EXTERNAL,
          type: disdk.sdk.MimeType.PNG
        }
      ],
      {
        additionalImages: [
          {
            href: maskSingedUrl,
            storage: disdk.sdk.Storage.EXTERNAL
          }
        ],
        actionJSON: actionJson
      })
      console.log(`${job.isDone()} - ${job.jobId}`)
  } catch (e) {
    console.error(e)
  }
}
