function normalizeNumber (string = '') {
  return parseFloat(string.trim().replace(',', '.'));
}

module.exports = {
  normalizeNumber,
};