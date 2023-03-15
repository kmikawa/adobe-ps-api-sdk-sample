const awsFunctions = require('../../lib/awsFunctions')
const disdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input01.psd'), //aws s3
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input01.psd',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const job = await client.getDocumentManifest(input)
    console.log(JSON.stringify(job.outputs[0],null,2))
    console.log(`${job.isDone()} - ${job.jobId}`)
    // console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}