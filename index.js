const http = require('http');
const fs = require('fs');
const multer = require('multer');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("This is Home Page");
  } else if (req.method === 'GET' && req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("This is About Page");
  } else if (req.method === 'GET' && req.url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("This is Contact Page");
  } else if (req.method === 'POST' && req.url === '/file-write') {
    fs.writeFile('demo.txt', 'hello world', function (err) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end("Error writing file");
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("File written successfully");
      }
    });
  } else if (req.method === 'POST' && req.url === '/multer') {
    const storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './uploads');
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname);
      }
    });

    const upload = multer({ storage: storage }).single('myfile');

    upload(req, res, function (error) {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('File upload failed');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File upload success');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("Page not found");
  }
});

// Start the server and listen on port 5500
server.listen(5500, () => {
  console.log('Server is running on port 5500');
});
