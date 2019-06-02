const { parse }           = require('node-html-parser');
const cyrillicToTranslit  = require('cyrillic-to-translit-js');

const { normalizeNumber } = require('./utils');

class Parser {
  constructor (document = '') {
    this.source = document;
    this.structure = [];
    this.data = [];
    this.result = [];
  }

  get () {
    return this.result;
  }

  createStructure () {
    const src = parse(this.source).querySelectorAll('.td');

    for (const { structuredText } of src) {
      this.structure.push(structuredText);
    }
    this.structure.splice(0, 1);
    
    return this;
  }

  createData () {
    const preresult = [];
    
    this.structure.forEach( val => {
      if (preresult.length === 3) {
        this.data.push([ ...preresult ]);
        preresult.splice(0, preresult.length);
      }
      preresult.push(val);
    });

    if (preresult.length) {
      this.data.push([ ...preresult ]);
      preresult.splice(0, preresult.length);
    }
    
    return this;
  }

  convertToJSON () {
    this.data.forEach( arr => {
      if (arr[1] && arr[1].split('-')[0]) {

        const result = {
          key: cyrillicToTranslit().transform(arr[0], '_').toLowerCase(),
          min: normalizeNumber(arr[1].split('-')[0]),
          max: normalizeNumber(arr[1].split('-')[1]),
          value: normalizeNumber(arr[2]),
        };

        this.result.push(result);
      }
    });

    return this;
  }

}

module.exports = Parser;