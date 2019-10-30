const express    = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors       = require('cors');

const Processor  = require('../processor');
const { python } = require('../adapters');

const server = express();

server.use(cors({ origin: '*' }));
server.use(bodyParser.json());
server.use(fileUpload({
  createParentPath: true,
}));

server.get('/', (req, res) => {
  res.json({ hello: 'Hello World!' });
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
  
  if (!Object.keys(files).length) return res.status(400).send('No files were uploaded.');
  for (const key in files) {
    if (key) {
      const file = files[key];

      if (!Array.isArray(file)) {
        // Use the mv() method to place the file somewhere on your server
        file.mv(`./uploads/${file.name}`, err => {
          if (err) return res.status(500).send(err);

          console.log(`${process.cwd()}/uploads/${file.name}`);

          python({
            args: [
              `${process.cwd()}/uploads/${file.name}`,
              `${process.cwd()}/temp/${file.name}`
            ],
          })
            .end( async (err, code, signal) => {
              if (err) throw err;
              console.log('The exit code was: ' + code);
              console.log('The exit signal was: ' + signal);
              console.log('finished');
              
              const processor = new Processor();
    
              await processor.extractZIP(file.name);
              const result = await processor.buildReports();
    
              res.json(result);
            });
        });
      }
    }
  }
});

module.exports = server;