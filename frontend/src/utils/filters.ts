import filesize from 'filesize';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

import { shortDate, time, longDate, longestDate } from './helpers';
import { Dictionary } from '@/types';

dayjs.extend(relativeTime);
dayjs.locale('ru');

function capitalize (value: string): string {
  return value.toString().charAt(0).toUpperCase() + value.slice(1);
}

function toUpperCase (value: string): string {
  return value.toString().toUpperCase();
}

function from (date: string): string {
  if (!date) return 'нет данных';
  return dayjs(date).fromNow();
}

function toShortLocaleDate (date: string): string {
  if (!date) return 'нет данных';
  return new Date(date).toLocaleString('ru-RU', shortDate);
}

function toTime (date: string): string {
  if (!date) return '--:--';
  return new Date(date).toLocaleString('ru-RU', time);
}

function toLocaleDate (date: string): string {
  if (!date) return 'нет данных';
  return new Date(date).toLocaleString('ru-RU', longDate);
}

function toLongLocaleDate (date: string): string {
  if (!date) return 'нет данных';
  return new Date(date).toLocaleString('ru-RU', longestDate);
}

function currencyFormat (val: string | number, loc = 'RUB'): string {
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

function numberFormat (val: string | number): string {
  const value = Number(val);
  if (Number.isNaN(value)) return '0';
  return Number(value).toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function toReadableString (value: string | number): string {
  return filesize(Number(value));
}

const filters: Dictionary<any> = {
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
