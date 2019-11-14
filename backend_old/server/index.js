const express    = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors       = require('cors');

const Processor  = require('../processor');
const { python } = require('../adapters');

const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true })); 
server.use(fileUpload({
  createParentPath: true,
}));

server.get('/', (req, res) => {
  console.log('get / -', req.headers);
  
  res.json({ hello: 'Hello World!' });
});

server.post('/hello', (req, res) => {
  console.log('post / -', req.headers);

  res.json({ hello: 'Hello World!' });
});

server.post('/upload', ({ files, headers }, res ) => {
  console.log({ headers });
  console.log({ files });
  
  if (!Object.keys(files).length) return res.status(400).send('No files were uploaded.');
  for (const key in files) {
    if (key) {
      const file = files[key];

      if (!Array.isArray(file)) {
        // Use the mv() method to place the file somewhere on your server
        file.mv(`./uploads/${file.name}`, err => {
          if (err) return res.status(500).send(err);

          console.log(`${process.cwd()}/uploads/${file.name}`);

          return python({
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
    
              return res.json(result);
            });
        });
      }
    }
    else {
      return res.json({ success: 'false' });
    }
  }

});

module.exports = server;