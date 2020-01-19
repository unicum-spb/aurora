/* eslint-disable func-names */
import log from '@/services/log';

import BaseProvider from './base';

import { User } from '@/types/api';

import { ENDPOINTS } from '@/constants';


class Account extends BaseProvider {
  protected getUrl (userId: User['id']) {
    return `${ENDPOINTS.USERS}/${userId}.json`;
  }

  protected postUrl (userId: User['id']) {
    return `${ENDPOINTS.USERS}/${userId}`;
  }

  public async getById (userId: User['id']) {
    try {
      const { data: user } = await this.get<User>(this.getUrl(userId));
      log('Account/get', userId, user);
      return user;
    } catch (error) {
      console.error('Account/get', error);
      throw error;
    }
  }

  public async update (account: User) {
    try {
      const response = await this.put<User>(this.postUrl(account.id), account);
      if (response.status !== 204) { throw response; }
      const user = await this.getById(account.id);
      log('Account/update', account, user);
      return user;
    } catch (error) {
      console.error('Account/update', error);
      throw error;
    }
  }
}

export const AccountProvider = new Account();
