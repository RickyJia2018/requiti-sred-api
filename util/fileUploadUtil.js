const AWS = require('aws-sdk');
const Busboy = require('busboy');

const BUCKET_NAME = 'requiti';
const IAM_USER_KEY = 'AKIARWYWXN2S2457J3DZ';
const IAM_USER_SECRET = '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';

exports.uploadToS3 =(file)=> {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file.data
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
        console.log(data);
      });
  });
}

// module.exports = (app) => {
//   // The following is an example of making file upload with additional body
//   // parameters.
//   // To make a call with PostMan
//   // Don't put any headers (content-type)
//   // Under body:
//   // check form-data
//   // Put the body with "element1": "test", "element2": image file

// }