import qs from 'qs';

/**
 * альтернативный парсер query
 *
 * * @AlexQuidditch
 * стандартный парсинг query пробрасывает булевы значения в строчном представлении
 * ex. ?foo=true -> { foo: 'true' }
 * данный парсер перезначает это поведение, приводя строки к булевым
 * ex. ?foo=true -> { foo: true }
 *
 * @param {string} query
 * @returns Object parsed query
 */
export function parseQuery (query: string = ''): any {
  const parsed = qs.parse(query, {
    ignoreQueryPrefix: true,
    decoder (source) {
      const intermediate: string = source;
      let result: boolean | string = false;

      if (intermediate === 'true' || intermediate === 'false') {
        result = (intermediate === 'true');
      } else if (typeof intermediate === 'string' && intermediate.length === 0) {
        result = true;
      } else if (typeof intermediate === 'string' && intermediate.length > 0) {
        result = intermediate;
      }

      return result;
    }
  });
  return parsed;
}
