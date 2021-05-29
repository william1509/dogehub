import express from 'express';
import https from 'https';
import fs from 'fs';

const port = 3000;

const privateKey = fs.readFileSync('/root/server/src/sslcert/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('/root/server/src/sslcert/selfsigned.crt', 'utf8');

const options = {
  key: privateKey,
  cert: certificate
};

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/videos', (req, res) => {
  const fileNames = fs.readdirSync("/root/server/src/public/");
  res.send(fileNames);
});

app.get('/:vid', (req, res) => {
  res.sendFile('/root/server/src/public/' + req.params.vid);
});

var server = https.createServer(options, app)

server.listen(port, '0.0.0.0', () => {
  return console.log(`server is listening on ${port}`);
});
