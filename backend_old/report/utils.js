const dayjs              = require('dayjs');
const customParseFormat  = require('dayjs/plugin/customParseFormat');
const cyrillicToTranslit = require('cyrillic-to-translit-js');

dayjs.extend(customParseFormat);

function normalizeNumber (string = '') {
  return parseFloat(string.trim().replace(',', '.'));
}

function parsePhysique (string = '') {
  const height = string.split(',')[0];
  const weight = string.split(',')[1];

  return {
    weight: Number(weight.match(/\d/g).join('')),
    height: Number(height.match(/\d/g).join('')),
  };
}

function parseDate (dateAndTimeString = '') {
  const date = dateAndTimeString.split(' ')[0];
  const time = dateAndTimeString.split(' ')[1];
  const hours   = time.split(':')[0];
  const minutes = time.split(':')[1];
  
  return dayjs(date, 'DD.MM.YYYY')
    .hour(Number(hours))
    .minute(Number(minutes))
    .format();
}

function parseName (name = '') {
  return new cyrillicToTranslit().transform(name);
}

function parseSex (sex = '') {
  return sex === 'Mужчины'
    ? 'man'
    : 'female';
}

function parseAge (age = '') {
  return Number(age);
}

module.exports = {
  normalizeNumber,
  parsePhysique,
  parseDate,
  parseName,
  parseSex,
  parseAge,
};