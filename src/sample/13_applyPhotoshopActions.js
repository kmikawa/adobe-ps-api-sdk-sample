const awsFunctions = require('../lib/awsFunctions')
const disdk = require('../../config/config.js')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.jpg'), //aws s3
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.jpg',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test13.png'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PNG
    }

    const options = {
      actionJSON: [
        {"_obj":"oilPaint","brushScale":0.8,"cleanliness":2.3,"lightDirection":-60,"lightingOn":true,"microBrush":10.0,"specularity":1.3,"stylization":4.0}
      ]
    }

    const job = await client.applyPhotoshopActions(input, output, options)
    console.log(`${job.isDone()} - ${job.jobId}`)

  } catch (e) {
    console.error(e)
  }
}
