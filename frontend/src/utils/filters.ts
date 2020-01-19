import filesize from 'filesize';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

import { shortDate, time, longDate, longestDate } from './helpers';
import { Dictionary } from '@/types';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export function capitalize (value: string): string {
  return value.toString().charAt(0).toUpperCase() + value.slice(1);
}

export function toUpperCase (value: string): string {
  return value.toString().toUpperCase();
}

export function from (date: string): string {
  if (!date) return 'нет данных';
  return dayjs(date).fromNow();
}

/**
 * Thu Feb 08 2018 22: 56: 48 GMT + 0300(RTZ 2(зима)) --> "08.02.18"
 * @param {string} Date
 * @returns {string}
 */
export function toShortLocaleDate (date: string): string {
  if (!date) return 'нет данных';
  return new Date(date).toLocaleString('ru-RU', shortDate);
}

/**
 * Thu Feb 08 2018 22: 56: 48 GMT + 0300(RTZ 2(зима)) --> "08.02.18"
 * @param {string} Date
 * @returns {string}
 */
export function toShortLocaleDateAndTime (date: string): string {
  if (!date) return 'нет данных';
  return new Date(date).toLocaleString('ru-RU', {
    ...shortDate,
  });
}

/**
 * "2017-09-03T18:23:29.078Z" --> 21:23
 * @param {string} Date
 * @returns {string}
 */
export function toTime (date: string): string {
  if (!date) return '--:--';
  return new Date(date).toLocaleString('ru-RU', time);
}

/**
 * "2017-09-20T20:32:25.884Z" --> 20 сентября 2017 г., 23:32;
 * @param {string} Date
 * @returns {string}
 */
export function toLocaleDate (date: string): string {
  if (!date) return 'нет данных';
  return new Date(date).toLocaleString('ru-RU', longDate);
}

/**
 * 20 сентября 2017 г., 23:32
 * @param {string} Date
 * @returns {string}
 */
export function toLongLocaleDate (date: string): string {
  if (!date) return 'нет данных';
  return new Date(date).toLocaleString('ru-RU', longestDate);
}

export function currencyFormat (val: string | number, loc = 'RUB'): string {
  const locale = loc || 'RUB';
  const value = Number(val);
  if (Number.isNaN(value)) return '0';
  return Number(value).toLocaleString('ru-RU', {
    style: 'currency',
    currency: locale,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function numberFormat (val: string | number): string {
  const value = Number(val);
  if (Number.isNaN(value)) return '0';
  return Number(value).toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function toReadableString (value: string | number): string {
  return filesize(Number(value));
}

const filters: Dictionary<Function> = {
  capitalize,
  toUpperCase,
  from,
  toShortLocaleDate,
  toLocaleDate,
  toTime,
  currencyFormat,
  numberFormat,
  toReadableString,
  toLongLocaleDate,
};

export default filters;
