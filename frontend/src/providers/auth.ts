/* eslint-disable func-names */
import API from '@/services/api';
import log from '@/services/log';

import { ENDPOINTS } from '../constants';


class Auth {
  async signIn (payload: any) {
    try {
      const { data } = await API.post<any>(ENDPOINTS.AUTH_SIGN_IN, payload);
      log('Auth/signIn', payload, data);
      return data;
    } catch (error) {
      console.error('Auth/signIn', error);
      return false;
    }
  }

  async signUp (payload: any) {
    try {
      const { data } = await API.post<any>(ENDPOINTS.AUTH_SIGN_UP, payload);
      log('Auth/signUp', payload, data);
      return data;
    } catch (error) {
      console.error('Auth/signUp', error);
      return false;
    }
  }

  async getCurrentUser () {
    try {
      const { data } = await API.get<any>(ENDPOINTS.AUTH_GET_CURRENT_USER);
      log('Auth/getCurrentUser', null, data);
      return data;
    } catch (error) {
      console.error('Auth/getCurrentUser', error);
      return false;
    }
  }
}

export const AuthProvider = new Auth();
