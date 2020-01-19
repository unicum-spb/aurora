import { ReportMeta, Scalars, ReportField } from '@/types'

import _$, { load } from 'cheerio'

import * as utils from './utils'
import { Sex } from '../../types/enums'


export class Report {
  // private source: Scalars['String']
  private structure: Array<Scalars['String']>
  private data: Array<Array<Scalars['String']>>

  protected title: Scalars['String']
  protected result: Array<ReportField>
  protected meta: ReportMeta
  protected columnsInRowQuantity: Scalars['Number']

  protected $: CheerioStatic

  constructor(document: string) {
    // this.source = document
    this.$ = load(document)
    this.structure = []
    this.data = []

    this.title = ''
    this.result = []
    this.meta = {
      name: '',
      age: 0,
      date: '',
      physique: {
        weight: 0,
        height: 0,
      },
      sex: Sex.Male,
    }

    this.columnsInRowQuantity = 4;
  }

  getTitle() {
    return this.title;
  }

  getResult() {
    const { title, result } = this

    return {
      title,
      fields: result,
    }
  }

  getMetaData() {
    return this.meta
  }

  createStructure() {
    this.$('tr.td > td.td').each((index, el) => {
      const $align = _$(el).attr('align')
      if ($align?.match('middle')) {
        const text = _$(el).text()
        const image = _$(el).find('img').attr('src')
        if (text.length) {
          this.structure.push(text)
        }
        if (image?.length) {
          this.structure.push(image)
        }
      }
    })

    return this
  }

  createData() {
    const preResult: Array<Scalars['String']> = []

    this.structure.forEach(val => {
      if (preResult.length === this.columnsInRowQuantity) {
        this.data.push([...preResult])
        preResult.splice(0, preResult.length)
      }

      preResult.push(val)
    })

    if (preResult.length) {
      this.data.push([...preResult])
      preResult.length = 0
    }

    return this
  }

  convertToJSON() {
    this.data.forEach(arr => {
      if (this.title === 'Состояние костей') {
        console.log(arr)
        return
      }

      if (arr[1] && arr[1].split('-')[0] && arr[1].split('-')[1]) {

        const [title, range, value, relative] = arr

        const [firstInRange, lastInRange] = range.split('-')

        const result: ReportField = {
          title,
          min: utils.normalizeNumber(firstInRange),
          max: utils.normalizeNumber(lastInRange),
          value: utils.normalizeNumber(value),
          relative: relative.slice(0, relative.length - 4), // 4 - длина расширения с точкой
        }

        this.result.push(result)
      }
    })

    return this
  }

  extractTitle() {
    const { $ } = this

    const $el = $('table:nth-child(1) font')

    const src = $el.text().split('(')[1]
    const title = src.substr(0, src.length - 1) // выпиливает скобочку справа в названии

    if (title === 'Состояние костей') {
      this.columnsInRowQuantity = 3
    }
    this.title = title;

    return this
  }

  extractMetaInformation() {
    const { $ } = this

    const $el = $('table:nth-child(2) > tbody > tr td')

    const metaArray = []

    for (const key in $el) {
      if ($el[key]) {
        const { type, name, children } = $el[key]

        if (type === 'tag' && name === 'td') {
          if (children?.[0].data && children[0].type === 'text') {
            metaArray.push(children[0].data.split(': ')[1])
          }
        }
      }
    }

    const [name, sex, age, physique, date] = metaArray

    this.meta = {
      name,
      sex: utils.parseSex(sex),
      age: utils.parseAge(age),
      physique: utils.parsePhysique(physique),
      date: utils.parseDate(date),
    }

    return this
  }
}
