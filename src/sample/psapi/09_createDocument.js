/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const awsFunctions = require('../../lib/awsFunctions')
const disdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test09.psd'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PSD
    }

    const options = {
      document: {
        width: 960,
        height: 586,
        resolution: 72,
        fill: disdk.sdk.BackgroundFill.TRANSPARENT,
        mode: disdk.sdk.Colorspace.RGB
      },
      layers: [
        {
          add: {},
          bounds: {
            top: 0,
            left: 0,
            width: 200,
            height: 100
          },
          type: disdk.sdk.LayerType.TEXT_LAYER,
          text: {
            content: "Hello",
            characterStyles: [
              {
                fontSize: 72
              }
            ]
          }
        },
        {
          add: {
            insertTop: true
          },
          type: disdk.sdk.LayerType.ADJUSTMENT_LAYER,
          adjustments: {
            brightnessContrast: {
              brightness: -50
            }
          }
        },
        {
          input: {
            // href: await awsFunctions.getSignedUrl('getObject', 'input/input03.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.jpg)
            href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input03.jpg',
            storage: disdk.sdk.Storage.EXTERNAL,
          },
          type: disdk.sdk.LayerType.LAYER,
          name: 'New Layer 1'
        }
      ]
    }

    const job = await client.createDocument(output, options)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}