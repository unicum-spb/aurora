const fs    = require('fs');
const JSZip = require('jszip');

const Report = require('../report');


class Processor {
  constructor () {
    this._uploadsPath = `${ process.cwd() }/temp/`;
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
          const report = new Report(file);
            
          await report
            .createStructure()
            .extractMetaInformation()
            .createData()
            .convertToJSON();

          this._reports.push(report.get());
        }

        const { meta } = new Report(this._files[0])
                      .extractMetaInformation();

        const result = {
          meta,
          reports: this._reports
        };
        
        resolve(result);
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
          // асинхронно загружаю архив
          const zip = await JSZip.loadAsync(data);
          // получаю список имён файлов
          const files = Object.keys(zip.files);

          // отфильтровываю *.htm файлы
          this._names = files.filter(( file, i ) => file.includes('.htm') && i != 0 );

          // извлекаю каждый .htm файл как строку
          // добавляю в массив файлов 
          for (const fileName of this._names) {
            if (JSZip.support.string) {
              const file = await zip.file(fileName).async('string');
              this._files.push(file);
            }
          }
        
          // возвращаю массив файлов в виде строк
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