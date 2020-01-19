/* eslint-disable no-restricted-syntax */
import cloneDeep from 'lodash/cloneDeep';

import { createNameSpaceType } from '@/types/helpers.d';
import { Dictionary } from '@/types';

// "2017-09-20T20:32:25.884Z" --> 20 сентября, 23:32;
const longDate = {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: 'long'
};

// "2017-09-20T20:32:25.884Z" --> 20 сентября 2017 г., 23:32;
const longestDate = {
  hour: '2-digit',
  minute: '2-digit',
  day: '2-digit',
  month: 'long',
  year: 'numeric'
};

// Thu Feb 08 2018 22: 56: 48 GMT + 0300(RTZ 2(зима)) --> "08.02.18"
const shortDate = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
};

// "2017-09-03T18:23:29.078Z" --> 21:23
const time = {
  hour: '2-digit',
  minute: '2-digit'
};

/**
 * Получить копию объекта
 */
function getCopyOf<T = any> (object: any) {
  return cloneDeep<T>(object);
}

function isNonEmptyArray (array: Array<any>): boolean {
  return !!(Array.isArray(array) && array.length);
}

function createNameSpace (nameSpace: string): createNameSpaceType {
  const namespace = nameSpace;

  return {
    with (name) {
      return name && name.length > 1
        ? `${namespace}/${name}`
        : namespace;
    }
  };
}

function convertArrayToObject (array: Array<Dictionary<any>>) {
  const result: Dictionary<any> = {};
  array.forEach(({ key, value }) => result[key] = value);
  return result;
}

function convertObjectToArray (object: Dictionary<any>) {
  const result: Array<Dictionary<any>> = [];
  for (const key in object) {
    if (key) {
      const value = object[key];
      result.push({ key, value });
    }
  }
  return result;
}

export {
  longDate,
  time,
  shortDate,
  longestDate,
  getCopyOf,
  isNonEmptyArray,
  createNameSpace,
  convertArrayToObject,
  convertObjectToArray,
};
