const awsFunctions = require('../../lib/awsFunctions')
const disdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.png'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input01.png)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.png',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test07.png'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PNG
    }

    const options = {
      Exposure: 0.50,
      Contrast: 10,
      WhiteBalance: "Auto"
    }

    const job = await client.editPhoto(input, output, options)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}