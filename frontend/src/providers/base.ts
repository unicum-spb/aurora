/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { StorageService } from '@/services/storage';

import EnvironmentService from '@/services/environment';
import EventService from '@/services/event';

export const GET = 'get';
export const REMOVE = 'remove';
export const POST = 'post';
export const PUT = 'put';
export const PATCH = 'patch';

function transformRequestConfig (config: AxiosRequestConfig) {
  const token: string = StorageService.get('token');

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}

function transformRequestError (error: any) {
  console.error('REQUEST error -', error);
  throw error;
}

function transformResponseConfig (response: AxiosResponse) {
  return response;
}

function transformResponseError (error: any) {
  if (error) {
    if (error.response.status === 401 && !error.config.url.includes('/users/login')) {
      EventService.emit('authentication-error', error.response.data.error);
    }
    if (error.response) {
      console.error('RESPONSE error -', error.response);
      throw error.response.data.error;
    }
    throw error;
  } else {
    console.error('! Неизвестная ошибка API !');
  }
}

class BaseProvider {
  private readonly agent: AxiosInstance;

  constructor () {
    this.agent = axios.create({
      baseURL: `${EnvironmentService.CurrentAPI}`,
    });

    this.agent.interceptors.request.use(
      transformRequestConfig,
      transformRequestError
    );

    this.agent.interceptors.response.use(
      transformResponseConfig,
      transformResponseError,
    );
  }

  protected get<T = any, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.agent.get(url, config);
  }

  protected remove<T = any, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.agent.delete(url, config);
  }

  protected post<T = any, R = AxiosResponse<T>> (url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.agent.post(url, payload, config);
  }

  protected put<T = any, R = AxiosResponse<T>> (url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.agent.put(url, payload, config);
  }

  protected patch<T = any, R = AxiosResponse<T>> (url: string, payload?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.agent.patch(url, payload, config);
  }
}

export default BaseProvider;
