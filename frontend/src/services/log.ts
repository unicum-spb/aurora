import Environment from './environment';

function getMessageFromEnv (value: any): string | any {
  if (Environment.isProduction) {
    return JSON.stringify(value);
  }
  return value;
}

/**
 * * Logs API request
 * @param {string} name - имя запроса
 * @param {any} params - параметры запроса
 * @param {any} response - ответ
 */
export default function (name: string, params?: any, response?: any, errors?: any): void {
  console.group('%c API Request ', 'color: white; background-color: #2274A5', getMessageFromEnv(name));
  console.log(
    'query:\n', getMessageFromEnv(params.query), '\n\n'
    + 'variables:\n', getMessageFromEnv(params.variables), '\n\n'
    + 'response:\n', getMessageFromEnv(response), '\n\n'
    + 'errors:\n', getMessageFromEnv(errors)
  );
  console.groupEnd();
  if (Environment.isProduction) console.clear();
}
