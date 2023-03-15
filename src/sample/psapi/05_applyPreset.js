const awsFunctions = require('../../lib/awsFunctions')
const disdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await disdk.initSDK()

    const input = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/input03.jpg'), //aws s3
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/input03.jpg',
      storage: disdk.sdk.Storage.EXTERNAL,
    }

    const preset = {
      // href: await awsFunctions.getSignedUrl('getObject', 'input/Auto-BW.xmp'), //aws s3
      href: 'https://raw.githubusercontent.com/kmikawa/testfiles/main/input/vignette_b.xmp',
      storage: disdk.sdk.Storage.EXTERNAL
    }

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test05.png'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PNG
    }

    const job = await client.applyPreset(input, preset, output)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}