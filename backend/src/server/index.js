const express    = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors       = require('cors');

const Processor  = require('../processor');

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(fileUpload({
  createParentPath: true,
}));

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.post('/', (req, res) => {
  res.send('Hello World!');
});

// server.post('/upload', ({ files }, res) => {
//   console.log(files);
//   res.status(201).send('Ok');
// });

server.post('/upload', ({ files }, res ) => {
  console.log(files);
  
  if (!Object.keys(files).length) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const file = files.file;

  // Use the mv() method to place the file somewhere on your server
  file.mv(`./uploads/${ file.name }`, async err => {
    if (err) {
      return res.status(500).send(err);
    }

    const processor = new Processor();

    await processor.extractZIP(file.name);
    const result = await processor.buildReports();
      
    res.send(result);
  });
});

module.exports = server;