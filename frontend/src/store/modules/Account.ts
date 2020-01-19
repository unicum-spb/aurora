/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */

import { Module } from 'vuex/types';
import { User } from '@/types/api';
import { RootState } from '@/types/store';
import { PendingObject } from '@/types/shared';

import { AccountProvider } from '@/providers';


const module: Module<RootState['Account'], RootState> = {
  namespaced: true,

  state: {
    account: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
    },
    pending: {
      getOwnAccount: false,
      update: false,
    },
    errors: {}
  },

  getters: {
    fullName: ({ account }) => `${account.firstName} ${account.lastName}`,
  },

  actions: {
    async getOwnAccount ({ commit, rootState }) {
      const key = 'getOwnAccount';

      const userId = rootState.Auth.user.id;

      commit('SET_PENDING', { key });
      const account = await AccountProvider.getById(userId);
      commit('SET_PENDING', { key, value: false });

      // if (errors && errors.length) {
      //   commit('SET_ERRORS', { key, errors });
      //   return false;
      // }
      commit('SET_ACCOUNT', account);
      return true;
    },

    async update ({ commit }, payload: User) {
      const key = 'update';

      commit('SET_PENDING', { key });
      const account = await AccountProvider.update(payload);
      commit('SET_PENDING', { key, value: false });

      // if (errors && errors.length) {
      //   commit('SET_ERRORS', { key, errors });
      //   return false;
      // }
      commit('SET_ACCOUNT', account);
      return true;
    },
  },

  mutations: {
    SET_ACCOUNT (state, account: User) {
      state.account = account;
    },

    SET_ERRORS (state, { key, errors }) {
      state.errors[key] = errors;
    },

    CLEAR_ERRORS (state) {
      for (const key in state.errors) {
        if (state.errors[key]) state.errors[key] = [];
      }
    },

    CLEAR_ERRORS_BY_KEY (state, key: string) {
      state.errors[key] = [];
    },

    SET_PENDING (state, { key, value = true }: PendingObject) {
      state.pending[key] = value;
    },
  },

  modules: {},
};

export default module;
