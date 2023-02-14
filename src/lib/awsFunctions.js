const { awsConfig } = require('../../config/config')

// https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_ListObjects_section.html
async function listObjects(prefix) {
    const AWS = require('aws-sdk')
    AWS.config.update({"region": awsConfig.region});
    const s3 = new AWS.S3()
    const params = {
        Bucket: awsConfig.bucketName,
        Prefix: prefix,
        MaxKeys: 5
    };
    const data = await s3.listObjectsV2(params).promise()
    const regexp = new RegExp(/^((?!DS_Store).)*$/, 'i');
    const filtered = data.Contents.filter(content => regexp.test(content.Key))
    data.Contents = filtered
    return data
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
// operation: getObject || putObject
// object_key: object path

async function getSignedUrl( operation, object_key ) {
    var AWS = require('aws-sdk')
    AWS.config.update({"region": awsConfig.region});
    let params = {Bucket: awsConfig.bucketName, Key: object_key, Expires: 3600 * 24};
    let s3 = new AWS.S3({apiVersion: '2006-03-01', signatureVersion: 'v4'});
    var url = await s3.getSignedUrlPromise(operation, params);
    return url
}

module.exports = {
    listObjects,
    getSignedUrl
}