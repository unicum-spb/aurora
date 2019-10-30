const { parse } = require('node-html-parser');
const { load }  = require('cheerio');

const {
  normalizeNumber,
  parsePhysique,
  parseName,
  parseDate,
  parseSex,
  parseAge
} = require('./utils');

class Report {
  constructor (document = '') {
    this._source = document;
    this._structure = [];
    this._data = [];
    this._result = [];
    this._meta = {};
  }

  get () {
    return this._result;
  }

  get meta () {
    return this._meta;
  }

  createStructure () {
    const src = parse(this._source).querySelectorAll('.td');
    
    for (const { structuredText } of src) {
      this._structure.push(structuredText);
    }
    this._structure.splice(0, 1);

    return this;
  }

  createData () {
    const preresult = [];
    
    this._structure.forEach( val => {
      if (preresult.length === 3) {
        this._data.push([ ...preresult ]);
        preresult.splice(0, preresult.length);
      }
      preresult.push(val);
    });

    if (preresult.length) {
      this._data.push([ ...preresult ]);
      preresult.splice(0, preresult.length);
    }
    
    return this;
  }

  convertToJSON () {
    this._data.forEach( arr => {
      if (arr[1] && arr[1].split('-')[0]) {

        const result = {
          title: arr[0],
          min: normalizeNumber(arr[1].split('-')[0]),
          max: normalizeNumber(arr[1].split('-')[1]),
          value: normalizeNumber(arr[2]),
        };

        this._result.push(result);
      }
    });

    return this;
  }

  extractMetaInformation () {
    const metaArray = [];

    const $ = load(this._source);
    // const element = $('table:nth-child(2) > tbody > tr td');
    const element = $('table:nth-child(2) > tbody > tr td');

    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        const { type, name, children } = element[key];

        if (type === 'tag' && name === 'td') {
          if (children && children[0].type === 'text') {
            metaArray.push(children[0].data.split(': ')[1]);
          }
        }
      }
    }

    this._meta = {
      name: metaArray[0],
      sex: parseSex(metaArray[1]),
      age: parseAge(metaArray[2]),
      physique: parsePhysique(metaArray[3]),
      date: parseDate(metaArray[4]),
    };

    return this;
  }

}

module.exports = Report;