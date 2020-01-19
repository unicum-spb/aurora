/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-useless-catch */
import { Scalars, ReportResult, TypeQuantumReportModel } from '@/types';

import * as fs from 'fs';
import * as JSZip from 'jszip';

import { promisify } from 'util';

import { EnvironmentServiceConstants } from '../../keys';

import { python } from '../../adapters';
import { Report } from './report';

const readFile = promisify(fs.readFile);

export class Processor {
  private file: Express.Multer.File;
  private names: Array<Scalars['String']>;
  private extractedFiles: Array<Scalars['String']>;
  private reports: Array<ReportResult>;

  constructor(file: Express.Multer.File) {
    this.file = file;
    this.names = [];
    this.extractedFiles = [];
    this.reports = [];
  }

  getFileList() {
    return this.extractedFiles;
  }

  getNameList() {
    return this.names;
  }

  async unpackZIP() {
    const { file } = this;

    try {
      await new Promise<boolean>((resolve, reject) => {
        return python({
          args: [
            file.path,
            `${EnvironmentServiceConstants.TEMP_PATH}/${file.filename}`
          ],
        })
          .end((err, code, signal) => {
            if (err) reject(err);

            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');

            resolve(true);
          });
      });

    } catch (error) {
      console.error('extractProcess - ', error);
    }

    return this;
  }

  async extractFiles() {
    const { file } = this;

    try {
      const data = await readFile(`${EnvironmentServiceConstants.TEMP_PATH}/${file.filename}`)
      // асинхронно загружаю архив
      const zip = await JSZip.loadAsync(data);
      // получаю список имён файлов
      const files = Object.keys(zip.files);

      // отфильтровываю *.htm файлы
      this.names = files.filter((f, i) => f.includes('.htm') && i !== 0);

      // извлекаю каждый .htm файл как строку
      // добавляю в массив файлов
      for (const fileName of this.names) {
        // @ts-ignore
        if (JSZip.support.string) {
          // @ts-ignore
          const unpackedFile: Scalars['String'] = await zip.file(fileName).async('string');
          this.extractedFiles.push(unpackedFile);
        }
      }

      // возвращаю массив файлов в виде строк
      return this.extractedFiles;
    } catch (error) {
      console.error('Quantum: extractFiles -', error);
      throw error;
    };
  }

  buildReports() {
    const { reports, extractedFiles } = this;

    try {
      for (const file of extractedFiles) {
        const report = new Report(file);

        const title = report
          .extractTitle()
          .getTitle()

        console.log('title:', title)

        if (title !== 'Состояние костей') {
          const result = report
            .extractTitle()
            .createStructure()
            .createData()
            .convertToJSON()
            .getResult()

          this.reports.push(result);
        }
      }

      const meta = new Report(extractedFiles[0])
        .extractMetaInformation()
        .getMetaData();

      const result: Omit<TypeQuantumReportModel, 'id'> = {
        meta,
        reports
      };

      return result;
    } catch (error) {
      throw error;
    }
  }
}
