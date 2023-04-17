/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

// This script is to generate a Bearer Token.
// How to run:
// node src/sample/psapi/00_getAdobeConfig.js

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