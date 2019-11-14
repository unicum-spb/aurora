import { ReportMeta, Scalars, ReportResult, ReportField } from '@/types';

import { load } from 'cheerio';

import { parse, HTMLElement } from 'node-html-parser';

import * as utils from './utils';


export class Report {
  private source: Scalars['String'];
  private structure: Array<Scalars['String']>;
  private data: Array<Array<Scalars['String']>>;

  protected title: Scalars['String'];
  protected result: Array<ReportField>;
  protected meta: ReportMeta;

  protected $: CheerioStatic;
  
  constructor (document: string = '') {
    this.source = document;
    this.$ = load(document);
    this.structure = [];
    this.data = [];

    this.title = '';
    this.result = [];
    this.meta = {
      name: '',
      age: 0,
      date: '',
      physique: {
        weight: 0,
        height: 0,
      },
      sex: 'male'
    };
  }

  getResult () {
    const { title, result } = this;
    
    return {
      title,
      fields: result,
    };
  }

  getMetaData () {
    return this.meta;
  }

  createStructure () {
    const parsed = parse(this.source) as HTMLElement;
    
    const src = parsed.querySelectorAll('.td');
    
    for (const { structuredText } of src) {
      this.structure.push(structuredText);
    }

    this.structure.splice(0, 1);

    return this;
  }

  createData () {
    const preresult: Array<Scalars['String']> = [];

    this.structure.forEach(val => {
      if (preresult.length === 3) {
        this.data.push([ ...preresult ]);
        preresult.splice(0, preresult.length);
      }

      preresult.push(val);
    });

    if (preresult.length) {
      this.data.push([...preresult]);
      preresult.splice(0, preresult.length);
    }

    return this;
  }

  convertToJSON () {
    this.data.forEach(arr => {
      if (arr[1] && arr[1].split('-')[0] && arr[1].split('-')[1]) {

        const [title, range, value] = arr;

        const result: ReportField = {
          title,
          min: utils.normalizeNumber(range.split('-')[0]),
          max: utils.normalizeNumber(range.split('-')[1]),
          value: utils.normalizeNumber(value),
        };

        this.result.push(result);
      }
    });

    return this;
  }

  extractTitle () {
    const { $ } = this;

    const $el = $('table:nth-child(1) font');

    const src = $el.text().split('(')[1];
    this.title = src.substr(0, src.length - 1); // выпиливает скобочку справа в названии

    return this;
  }

  extractMetaInformation () {
    const { $ } = this;

    const metaArray = [];

    const element = $('table:nth-child(2) > tbody > tr td');

    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        const { type, name, children } = element[key];

        if (type === 'tag' && name === 'td') {
          if (children && children[0].data && children[0].type === 'text') {
            metaArray.push(children[0].data.split(': ')[1]);
          }
        }
      }
    }

    this.meta = {
      name: metaArray[0],
      sex: utils.parseSex(metaArray[1]),
      age: utils.parseAge(metaArray[2]),
      physique: utils.parsePhysique(metaArray[3]),
      date: utils.parseDate(metaArray[4]),
    };

    return this;
  }

}