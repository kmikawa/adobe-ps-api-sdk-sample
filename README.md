# Adobe DI SDK Beta (Example)

### Preparation

##### Create Photoshop API credential

1. [Create a credential](https://developer.adobe.com/photoshop/api/signup/?ref=signup) in order to use Photoshop API. When creating a credential, a zip file will be automatically downloaded. It contains your private key (*private.key*).  Please store the private key securely, since Adobe does not retain a copy of it.

##### Prepare Storage

AWS

1. [Create AWS accont](https://docs.aws.amazon.com/rekognition/latest/dg/setting-up.html)
1. Set up AWS CLI
   1. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
   1. Configure [AWS CLI options](https://docs.aws.amazon.com/cli/latest/reference/:configure/): `aws configure`
   1. Test AWS CLI: `aws s3 ls` to list S3 objects

### Run sample script
1. Clone this project: `git clone git@github.com:kmikawa/adobe-di-sdk.git`
1. Install node modules: `npm install`
1. Save `config/config-template.js` as `config/config.js`, open `config/config.js`, and add your configuration (ex: `s3://kmikawa/input/`), save, and close.
1. Unzip your downloaded *config.zip* and save `private.key` as `config/private.key` in this project
1. Modify *output href* to use your storage for sample scripts in `src/sample/psapi/...` (ex: `src/sample/psapi/01_createCutout.js`)
1. Run a sample (ex: `node src/sample/psapi/01_createCutout.js`)

### Run sample script (batch job) - actionJSON endpoint is required
1. Modify input/output directories to use your S3 storage in `src/sample/batch_job/remove-background-batch.js`
1. Run a sample (ex: `node src/sample/batch_job/remove-background-batch.js`)
1. See outputs in your [S3 bucket](https://s3.console.aws.amazon.com/s3/buckets)
1. You can also use AWS CLI to sync files from your S3 storage into your local machine (ex: `aws s3 sync s3://kmikawa/input/output/ /Users/kmikawa/Desktop/output/`)

#### [OPTIONAL] To use actionJSON

1. Change `"/pie/psdService/photoshopActions"` to `"/pie/psdService/actionJSON"` in node_modules/@adobe/aio-lib-photoshop-api/spec/api.json


<!-- 

#### [OPTIONAL] To use actionJSON

1. Change `"/pie/psdService/photoshopActions"` to `"/pie/psdService/actionJSON"` in node_modules/@adobe/aio-lib-photoshop-api/spec/api.json

#### [OPTIONAL] Refine Results

1. npx webpack ./src/component/s3.js --mode development --target web --no-devtool -o ./public
// node s3.js

1. open public/index.html

#### [OPTIONAL] Create your node project from scratch

1. npm init

1. npm install @adobe/aio-lib-photoshop-api
   https://github.com/adobe/aio-lib-photoshop-api

1. npm install @adobe/jwt-auth
   https://www.npmjs.com/package/@adobe/jwt-auth

1. npm install aws-sdk
   https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/installing-jssdk.html

-->