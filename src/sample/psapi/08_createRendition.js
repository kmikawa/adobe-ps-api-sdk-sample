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

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.psd'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.psd)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.psd',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const output = [
      {
        href: await awsFunctions.getSignedUrl('putObject', 'output/test08.jpg'),
        storage: disdk.sdk.Storage.EXTERNAL,
        type: disdk.sdk.MimeType.JPEG,
        width: 300,
        quality: 7
      },
      {
        href: await awsFunctions.getSignedUrl('putObject', 'output/test08.png'),
        storage: disdk.sdk.Storage.EXTERNAL,
        type: disdk.sdk.MimeType.PNG,
        width: 260,
        compression: disdk.sdk.PngCompression.MEDIUM
      },
      {
        href: await awsFunctions.getSignedUrl('putObject', 'output/test08.tiff'),
        storage: disdk.sdk.Storage.EXTERNAL,
        type: disdk.sdk.MimeType.TIFF,
        width: 230
      }
    ]

    const job = await client.createRendition(input, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}