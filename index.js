var http = require('http');
var fs = require('fs');
var express = require('express');
var multer = require('multer');
var app = express();



var server = http.createServer(app);
app.get('/', function (req, res) {
    res.end("This is Home Page");
});

app.get('/about', function (req, res) {
    res.end("This is About Page");
});

app.get('/contact', function (req, res) {
    res.end("This is Contact Page");
});

app.post('/file-write', function (req, res) {    
    fs.writeFile('demo.txt', 'hello world', function (err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Error writing file");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("File written successfully");
        }
    });
});


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single('myfile');


app.post('/multer', function (req, res) {
    upload(req, res, function (error) {
        if (error) {
            res.send('File upload failed');
        } else {
            res.send('File upload success');
        }
    });
});


server.listen(5500, function () {
    console.log('Server is running on port 5500');
});