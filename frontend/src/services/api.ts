import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import EnvironmentService from './environment';


class Api {
  private readonly agent: AxiosInstance;

  constructor () {
    this.agent = axios.create({
      baseURL: `${EnvironmentService.CurrentAPI}`,
    });

    this.agent.interceptors.request.use(config => config, (error) => {
      console.error('REQUEST error -', error.response);
      throw error;
    });

    this.agent.interceptors.response.use(response => response, (error) => {
      if (error) {
        if (error.response) {
          console.error('RESPONSE error -', error.response);
          throw error.response;
        }
        throw error;
      } else {
        console.error('! Неизвестная ошибка API !');
      }
    });
  }

  public get<T = any> (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.agent.get(url, config);
  }

  public remove<T = any> (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.agent.delete(url, config);
  }

  public post<T = any> (url: string, payload?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.agent.post(url, payload, config);
  }

  public put<T = any> (url: string, payload?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.agent.put(url, payload, config);
  }

  public patch<T = any> (url: string, payload?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.agent.patch(url, payload, config);
  }
}

const API = new Api();

export default API;
