const awsFunctions = require('../../lib/awsFunctions')
const disdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.jpg)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.jpg',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test13.png'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PNG
    }

    const options = {
      actions: [
        {
          // href: await awsFunctions.getSignedUrl('getObject', 'input/fisheye.atn'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/fisheye.atn)
          href: 'https://github.com/kmikawa/testfiles/raw/main/input/fisheye.atn',
          storage: disdk.sdk.Storage.EXTERNAL,
        }
      ]
    }

    const job = await client.applyPhotoshopActions(input, output, options)
    console.log(`${job.isDone()} - ${job.jobId}`)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}
