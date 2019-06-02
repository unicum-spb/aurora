const fs    = require('fs');
const JSZip = require('jszip');

const Parser = require('../parser');


class Processor {
  constructor () {
    this._uploadsPath = `${ process.cwd() }/uploads/`;
    this._names   = [];
    this._files   = [];
    this._reports = [];
  }

  getFileList () {
    return this._files;
  }

  getNameList () {
    return this._names;
  }

  buildReports () {
    return new Promise( async ( resolve, reject ) => {
      try {

        for (const file of this._files) {
          const parser = new Parser(file);
            
          await parser
            .createStructure()
            .createData()
            .convertToJSON();

          this._reports.push(parser.get());
        }
        
        resolve(this._reports);
      } catch (error) {
        reject(error);
      }
    });
  }
  
  extractZIP (name) {
    return new Promise(( resolve, reject ) => {
      fs.readFile(this._uploadsPath + name, async (err, data) => {
        if (err) reject(err);
  
        try {
          const zip = await JSZip.loadAsync(data);
          const files = Object.keys(zip.files);

          this._names = files.filter(( file, i ) => file.includes('.htm') && i != 0 );

          for (const fileName of this._names) {
            if (JSZip.support.string) {
              const file = await zip.file(fileName).async('string');
              this._files.push(file);
            }
          }

          resolve(this._files);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    });
  }
}

module.exports = Processor;