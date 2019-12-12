/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-useless-catch */
import { Scalars, ReportResult, TypeQuantumReportModel } from '@/types';

import * as fs from 'fs';
import * as JSZip from 'jszip';

import { EnvironmentServiceConstants } from '../../keys';

import { python } from '../../adapters';
import { Report } from './report';

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

  buildReports() {
    const { reports, extractedFiles } = this;

    try {
      for (const file of extractedFiles) {
        const report = new Report(file);

        const result = report
          .extractTitle()
          .createStructure()
          .createData()
          .convertToJSON()
          .getResult()

        this.reports.push(result);
      }

      const meta = new Report(extractedFiles[0])
        .extractMetaInformation()
        .getMetaData();

      const result: TypeQuantumReportModel = {
        meta,
        reports
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  extractFiles() {
    const { file } = this;

    return new Promise<Array<Scalars['String']>>((resolve, reject) => {
      fs.readFile(`${EnvironmentServiceConstants.TEMP_PATH}/${file.filename}`, async (err, data) => {
        if (err) reject(err);

        try {
          // асинхронно загружаю архив
          const zip = await JSZip.loadAsync(data);
          // получаю список имён файлов
          const files = Object.keys(zip.files);

          // отфильтровываю *.htm файлы
          this.names = files.filter((file, i) => file.includes('.htm') && i != 0);

          // извлекаю каждый .htm файл как строку
          // добавляю в массив файлов
          for (const fileName of this.names) {
            // @ts-ignore
            if (JSZip.support.string) {
              // @ts-ignore
              const file: string = await zip.file(fileName).async('string');
              this.extractedFiles.push(file);
            }
          }

          // возвращаю массив файлов в виде строк
          resolve(this.extractedFiles);
        } catch (error) {
          console.error('Quantum: extractFiles -', error);
          reject(error);
        }
      });
    });
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
          .end(async (err, code, signal) => {
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
}
