const { Environment } = require('libgenaro');

const libgenaro = new Environment({
  bridgeUrl: 'http://101.132.159.197:8080',
  bridgeUser: 'simon@tedxsuzhou.com',
  bridgePass: 'fdsafdsa',
  encryptionKey: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
  logLevel: 4
});

const bucketId = '3d1d1d01492c3685b7d31ba1';
const filePath = './test.txt';

/* const state = libgenaro.storeFile(bucketId, filePath, {
    filename: 'test-upload.data',
    progressCallback: function(progress, downloadedBytes, totalBytes) {
        console.log('progress:', progress);
    },
    finishedCallback: function(err, fileId) {
        if (err) {
            return console.error(err);
        }
        console.log('File complete:', fileId);
    }
}); */

/* libgenaro.listFiles(bucketId, function (err, result) {
  console.log(result);
}); */

/* libgenaro.createBucket("user_1", function (err, result) {
  console.log(result);
}) */

/* libgenaro.deleteFile(bucketId, "15b4ea6780ad8405bad67dd7", function (err, result) {
  console.log(result);
}); */