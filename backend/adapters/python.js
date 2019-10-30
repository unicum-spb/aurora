const { PythonShell } = require('python-shell');

const python = options => {
  return new PythonShell(
    `${process.cwd()}/scripts/unpacker.py`,
    { ...options }
  );
};

module.exports = python;