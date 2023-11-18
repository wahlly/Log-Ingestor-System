const http = require('http');
const fs = require('fs');
const { streamLogs } = require('./ingestLogs');
const port = 3000;
const host = '127.0.0.1';

console.log("hurray")
http.createServer((req, res) => {
//     const videoStream = fs.createReadStream('stream.mp4')
//     videoStream.pipe(res)
})
      .listen(port, host, () => {
        console.log(`server is running on ${port}`);
      });