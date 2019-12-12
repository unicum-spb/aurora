import { Scalars } from '@/types';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

import { Sex, SexCyrillic } from '../../types/enums';

dayjs.extend(customParseFormat);

export function normalizeNumber(number: Scalars['String'] = '') {
  return parseFloat(number.trim().replace(',', '.'));
}

export function parsePhysique(physique: Scalars['String'] = '') {
  const [height, weight] = physique.split(',');

  const clearHeight = height.match(/\d/g) || [];
  const clearWeight = weight.match(/\d/g) || [];

  return {
    height: Number(clearHeight.join('')),
    weight: Number(clearWeight.join('')),
  };
}

export function parseDate(dateAndTimeString: Scalars['String'] = '') {
  const date = dateAndTimeString.split(' ')[0];
  const time = dateAndTimeString.split(' ')[1];
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];

  return dayjs(date, 'DD.MM.YYYY')
    .hour(Number(hours))
    .minute(Number(minutes))
    .format();
}

export function parseName(name: Scalars['String'] = ''): Scalars['String'] {
  return new cyrillicToTranslit().transform(name);
}

export function parseSex(sex: Scalars['String']) {
  if (sex !== SexCyrillic.Male) {
    return Sex.Female;
  } else {
    return Sex.Male;
  }
}

export function parseAge(age: Scalars['String'] | Scalars['Number'] = '') {
  return Number(age) | 0;
}
