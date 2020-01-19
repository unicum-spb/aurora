/* eslint-disable func-names */
import log from '@/services/log';

import BaseProvider from './base';
import { ENDPOINTS } from '../constants';

import { User } from '@/types/store/auth';

class Auth extends BaseProvider {
  async signIn (payload: any) {
    try {
      const { data } = await this.post<any>(ENDPOINTS.AUTH_SIGN_IN, payload);
      log('Auth/signIn', payload, data);
      return data;
    } catch (error) {
      console.error('Auth/signIn', error);
      throw error;
    }
  }

  async signUp (payload: any) {
    try {
      const { data } = await this.post<any>(ENDPOINTS.AUTH_SIGN_UP, payload);
      log('Auth/signUp', payload, data);
      return data;
    } catch (error) {
      console.error('Auth/signUp', error);
      throw error;
    }
  }

  async getCurrentUser () {
    try {
      const { data } = await this.get<User>(ENDPOINTS.AUTH_GET_CURRENT_USER);
      log('Auth/getCurrentUser', null, data);
      return data;
    } catch (error) {
      console.error('Auth/getCurrentUser', error);
      throw error;
    }
  }
}

export const AuthProvider = new Auth();
