const disdk = require('../../../config/config')

main()

async function main() {
  try {
    const token = await disdk.getToken()
    console.log(`Client Id (apiKey): ${disdk.adobeConfig.clientId}`)
    console.log(`Token: ${token}`)
  } catch (e) {
    console.error(e)
  }
}