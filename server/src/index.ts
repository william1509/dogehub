import express from 'express';

import fs from 'fs';

const app = express();
const port = 3000;

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

app.listen(port, '0.0.0.0', () => {
  return console.log(`server is listening on ${port}`);
});