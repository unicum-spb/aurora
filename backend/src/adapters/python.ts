import { PythonShell, Options } from 'python-shell';

export function python (options: Options) {
  return new PythonShell(
    `${process.cwd()}/dist/scripts/unpacker.py`,
    {
      pythonPath: 'python3',
      ...options
    }
  );
};