/* eslint-disable func-names */
import { AxiosRequestConfig } from 'axios';

import API from '@/services/api';
import log from '@/services/log';

import { TypeQuantumReportModel } from '@/types';

import { ENDPOINTS } from '../constants';


class Reports {
  async create (payload: FormData) {
    const options: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    };

    try {
      const { data } = await API.post<Array<TypeQuantumReportModel>>(ENDPOINTS.REPORTS_CREATE, payload, options);
      log('Reports/create', payload, data);
      return data;
    } catch (error) {
      console.error('Reports/create', error);
      throw error;
    }
  }
}

export const ReportsProvider = new Reports();
