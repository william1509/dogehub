import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

const port = 3000;

// const privateKey = fs.readFileSync(path.resolve(__dirname, 'sslcert/selfsigned.key'));
// const certificate = fs.readFileSync(path.resolve(__dirname, 'sslcert/selfsigned.crt'));

// const options = {
//   key: privateKey,
//   cert: certificate
// };

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/videos', (req, res) => {
  const fileNames = fs.readdirSync(path.resolve(__dirname, "public/"));
  res.send(fileNames);
});

app.get('/:vid', (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/" + req.params.vid));
});

app.on('uncaughtException', function (err) {
  console.log(err);
}); 

// var server = https.createServer(options, app)

// server.listen(port, '0.0.0.0', () => {
//   return console.log(`server is listening on ${port}`);
// });


app.listen(port, '0.0.0.0', () => {
  return console.log(`server is listening on ${port}`);
})