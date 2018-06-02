var http = require('http');
var Router = require('node-simple-router');
var router = Router(); // may also be router = new Router();
const uuidv1 = require('uuid/v1');
const { Environment } = require('libgenaro');

const libgenaro = new Environment({
    bridgeUrl: 'http://101.132.159.197:8080',
    bridgeUser: 'simon@tedxsuzhou.com',
    bridgePass: 'fdsafdsa',
    encryptionKey: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
    logLevel: 4
});

router.get("/hello", function(request, response) {response.end("Hello, World!");});

router.get('/bucket/all', function(request, response) {
    response.writeHead(200, {'Content-type': 'application/json'});
    libgenaro.getBuckets(function(err, result) {
        if (err) {
            response.end(JSON.stringify({success: false, msg: err}))
        }
        response.end(JSON.stringify(result));
    })
});

router.get('/bucket/create/:name', function(request, response) {
    response.writeHead(200, {'Content-type': 'application/json'});
    libgenaro.createBucket(request.params.name, function (err, result) {
        if (err) {
            response.end(JSON.stringify({success: false, msg: err}))
        }
        response.end(JSON.stringify(result));
    })
});
router.get('/file/:bucketId/:id', function(request, response) {
    response.writeHead(200, {'Content-type': 'application/json'});

    var filename = "downloads/" + uuidv1() + ".json";

    libgenaro.resolveFile(request.params.bucketId, request.params.id, filename, {
        progressCallback: function(progress, downloadedBytes, totalBytes) {
            console.log('progress:', progress)
        },
        finishedCallback: function(err) {
            if (err) {
                response.end(JSON.stringify({success: false, msg: err}));
            }

            require("fs").readFile(filename, function read(err, data) {
                if (err) {
                    throw err;
                }

                response.end(data);
            });
        }
    });
});

router.post('/file/upload', function(request, response) {
    var filedata = request.post.filedata;
    var data = request.post.data
    var bucketId = request.post.bucket;

    var filename = uuidv1() + ".json";
    require("fs").writeFile("uploads/" + filename, JSON.stringify({filedata: filedata, data: data}), function (err, written, string) {
        libgenaro.storeFile(bucketId, "uploads/" + filename, {
            filename: filename,
            progressCallback: function(progress, downloadedBytes, totalBytes) {
                console.log('progress:', progress);
            },
            finishedCallback: function(err, fileId) {
                if (err) {
                    response.end(JSON.stringify({success: false, msg: err}));
                }
                response.end(JSON.stringify({success: true, fileId: fileId}));
            }
        })
    });
});

var server = http.createServer(router);
server.listen(3000);
