# Adobe DI SDK Beta

### Example

#### AWS

1. [Create AWS accont](https://docs.aws.amazon.com/rekognition/latest/dg/setting-up.html)
1. Set up the [AWS CLI and AWS SDKs](https://docs.aws.amazon.com/rekognition/latest/dg/setup-awscli-sdk.html) and run `aws s3 ls` in Terminal to make sure you can list s3 directories
1. [Create a credential](https://developer.adobe.com/photoshop/api/signup/?ref=signup) to use Photoshop API and save `private.key` as `config/private.key`
1. Clone this project: `git clone git@github.com:kmikawa/adobe-di-sdk.git`
1. Install node modules: `npm install`
1. Save `config/config-template.js` as `config/config.js` and set the configuration (ex: `s3://kmikawa/input/`)
1. [OPTIONAL to use actionJSON] Change `"/pie/psdService/photoshopActions"` to `"/pie/psdService/actionJSON"` in node_modules/@adobe/aio-lib-photoshop-api/spec/api.json
1. Set output href for sample scripts in `src/sample/...` and run (ex: `node src/sample/01_createCutout.js`)
1. Enter your s3 input/output directories in `src/remove-background-batch.js` and run `node src/remove-background-batch.js`
1. See outputs in your [S3 bucket](https://s3.console.aws.amazon.com/s3/buckets) or sync your s3 storage (ex: `aws s3 sync s3://kmikawa/input/output/ /Users/kmikawa/Desktop/output/`)

### [OPTIONAL] Create your node project from scratch

1. npm init

1. npm install @adobe/aio-lib-photoshop-api
   https://github.com/adobe/aio-lib-photoshop-api

1. npm install @adobe/jwt-auth
   https://www.npmjs.com/package/@adobe/jwt-auth

1. npm install aws-sdk
   https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/installing-jssdk.html
