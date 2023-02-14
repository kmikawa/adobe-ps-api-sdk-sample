const awsFunctions = require('../lib/awsFunctions')
const disdk = require('../../config/config.js')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input02.psd'), //aws s3
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input02.psd',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const options = {
      layers: [
        {
          name: "so1",
          input: {
            // href: await awsFunctions.getSignedUrl('getObject', 'input/input02.jpg'), //aws s3
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input02.jpg',
            storage: disdk.sdk.Storage.EXTERNAL
          }
        }
      ]
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test10.png'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PNG
    }

    const job = await client.replaceSmartObject(input, output, options)
    console.log(`${job.isDone()} - ${job.jobId}`)

  } catch (e) {
    console.error(e)
  }
}
