const awsFunctions = require('../../lib/awsFunctions')
const disdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input02.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input02.jpg)
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input02.jpg',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test04.png'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PNG
    }

    const job = await client.straighten(input, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}