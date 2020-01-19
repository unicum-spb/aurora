import { AxiosRequestConfig } from 'axios';
import qs, { IStringifyOptions } from 'qs';

import log from '@/services/log';

import BaseProvider from './base';

import { Scalars } from '@/types';
import { QuantumReportModel } from '@/types/api';

const qsConfig: IStringifyOptions = {
  arrayFormat: 'brackets',
  encode: false
};

class Reports extends BaseProvider {
  getUrl (userId: Scalars['String']) {
    return `/users/${userId}/reports`;
  }

  async create ({ userId, formData }: { userId: Scalars['String'], formData: FormData }) {
    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };

    try {
      const { data } = await this.post<Array<QuantumReportModel>>(
        this.getUrl(userId), formData, options
      );
      log('Reports/create', { userId, formData }, data);
      return data;
    } catch (error) {
      console.error('Reports/create', error);
      throw error;
    }
  }

  async getById (userId: Scalars['String'], reportId: QuantumReportModel['id']) {
    const uri = `${this.getUrl(userId)}.json`;
    const query = qs.stringify({ filter: { where: { id: reportId } } }, qsConfig);
    const url = [ uri, query ].join('?');

    try {
      const { data } = await this.get<Array<QuantumReportModel>>(url);
      log('Reports/getById', { userId, reportId }, data[0]);
      return data[0];
    } catch (error) {
      console.error('Reports/getById', error);
      throw error;
    }
  }

  async removeById (userId: Scalars['String'], reportId: Scalars['String']) {
    const uri = `${this.getUrl(userId)}`;
    const query = qs.stringify({ filter: { where: { id: reportId } } }, qsConfig);
    const url = [ uri, query ].join('?');

    try {
      const { data } = await this.remove<Scalars['Number']>(url);
      log('Reports/removeById', { userId, reportId }, data);
      return data;
    } catch (error) {
      console.error('Reports/removeById', error);
      throw error;
    }
  }

  /**
   * Actions with collections
   */
  async getAll (userId: Scalars['String']) {
    try {
      const { data } = await this.get<Array<QuantumReportModel>>(
        `${this.getUrl(userId)}.json`
      );
      log('Reports/getAll', { userId }, data);
      return data;
    } catch (error) {
      console.error('Reports/getAll', error);
      throw error;
    }
  }

  async getByListOfId (userId: Scalars['String'], reportIds: ReadonlyArray<Scalars['String']>) {
    const reports = reportIds.map(reportId => this.getById(userId, reportId));

    try {
      const result = await Promise.all(reports);
      log('Reports/getByListOfId', { userId, reportIds });
      return result;
    } catch (error) {
      console.error('Reports/getByListOfId', error);
      throw error;
    }
  }

  async removeByListOfId (userId: Scalars['String'], reportIds: ReadonlyArray<Scalars['String']>) {
    const reports = reportIds.map(reportId => this.removeById(userId, reportId));

    try {
      const result = await Promise.all(reports);
      log('Reports/removeByListOfId', { userId, reportIds }, result);
      return result;
    } catch (error) {
      console.error('Reports/removeByListOfId', error);
      throw error;
    }
  }

  async getTypes (userId: Scalars['String']) {
    const preResult = [
      {
        id: 'qwidijwdiq8273812h1d',
        alias: 'quantum',
        title: 'Квантово-резонансный анализатор',
        type: 'application/zip'
      },
    ];

    try {
      // const result = await this.get(`${ this.getUrl(userId) }/types`)
      const result = await Promise.resolve(preResult);
      log('Reports/getTypes', { userId }, result);
      return result;
    } catch (error) {
      console.error('Reports/getTypes', error);
      throw error;
    }
  }
}

export const ReportsProvider = new Reports();
