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

    const output = {
      href: await awsFunctions.getSignedUrl('putObject', 'output/test12.psd'),
      storage: disdk.sdk.Storage.EXTERNAL,
      type: disdk.sdk.MimeType.PSD
    }

    const options = {
      layers: [
        {
          edit: {},
          name: "Hello",
          text: {
            content: "Good Bye"
          }
        },
        {
          add: {
            insertTop: true
          },
          type: "adjustmentLayer",
          adjustments: {
            hueSaturation: {
              colorize: true,
              channels: [
                {
                  channel: "master",
                  hue: 0,
                  saturation: -100,
                  lightness: 0
                }
              ]
            }
          }
        }
      ]
    }

    const job = await client.modifyDocument(input, output, options)
    console.log(`Response: ${JSON.stringify(job,null,2)}`)

  } catch (e) {
    console.error(e)
  }
}
