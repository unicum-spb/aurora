const { PythonShell } = require('python-shell');

const python = options => {
  return new PythonShell(
    `${process.cwd()}/scripts/unpacker.py`,
    {
      pythonPath: 'python3',
      ...options
    }
  );
};

module.exports = python;