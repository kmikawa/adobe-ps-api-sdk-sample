const awsFunctions = require('../lib/awsFunctions')
const disdk = require('../../config/config.js')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.psd'), //aws s3
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
    console.log(`${job.isDone()} - ${job.jobId}`)

  } catch (e) {
    console.error(e)
  }
}