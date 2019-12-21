/* eslint-disable func-names */
import { AxiosRequestConfig } from 'axios';
import qs, { IStringifyOptions } from 'qs';

import log from '@/services/log';

import { QuantumReportModel } from '@/types/api';

import BaseProvider from './base';
import { ENDPOINTS } from '../constants';

const qsConfig: IStringifyOptions = {
  arrayFormat: 'brackets',
  encode: false
};

class Reports extends BaseProvider {
  getUrl (userId: string) {
    return `/users/${userId}/reports`;
  }

  async create ({ userId, formData }: { userId: string, formData: FormData }) {
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

  async getAll (userId: string) {
    try {
      const { data } = await this.get<Array<QuantumReportModel>>(
        this.getUrl(userId)
      );
      log('Reports/get', { userId }, data);
      return data;
    } catch (error) {
      console.error('Reports/get', error);
      throw error;
    }
  }

  async getById (userId: string, reportId: string) {
    const uri = this.getUrl(userId);
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

  async getByListOfId (userId: string, reportIds: ReadonlyArray<string>) {
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
}

export const ReportsProvider = new Reports();
