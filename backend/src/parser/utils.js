const dayjs             = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

function normalizeNumber (string = '') {
  return parseFloat(string.trim().replace(',', '.'));
}

function parseDate (dateAndTimeString = '') {
  const date = dateAndTimeString.split(' ')[0];
  const time = dateAndTimeString.split(' ')[1];
  const hours   = time.split(':')[0];
  const minutes = time.split(':')[1];
  
  return dayjs(date, 'DD.MM.YYYY')
    .hour(hours)
    .minute(minutes)
    .format();
}

module.exports = {
  normalizeNumber,
  parseDate,
};