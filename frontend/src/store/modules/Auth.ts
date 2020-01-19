/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */

import { Module } from 'vuex/types';

import nanoid from 'nanoid';

import { RootState } from '@/types/store';
import { PendingObject } from '@/types/shared';

import { SessionStorage, StorageService } from '@/services/storage';

import { AuthProvider } from '@/providers';
import { Scalars } from '@/types';


const module: Module<RootState['Auth'], RootState> = {
  namespaced: true,

  state: {
    token: '',
    user: {
      id: '',
      email: ''
    },
    errors: {
      signUp: {},
      signIn: {},
      signOut: {},
      recover: {},
    },
    pending: {
      getCurrentUser: true,
      signUp: false,
      signIn: false,
      signOut: false,
      recover: false,
    },
  },

  getters: {
    isLoggedIn: state => Boolean(state.token),
    getErrorsByKey: state => (key: Scalars['String']) => state.errors[key],
  },

  actions: {
    async getCurrentUser ({ commit }): Promise<any> {
      const key = 'getCurrentUser';

      const token = StorageService.get('token');
      if (!token) {
        commit('SET_PENDING', { key, value: false });
        return null;
      }

      commit('SET_PENDING', { key });
      const user = await AuthProvider.getCurrentUser();
      commit('SET_PENDING', { key, value: false });

      commit('SET_AUTH_DATA', { user, token });
      return user;
    },

    async signIn ({ commit }, payload: any): Promise<boolean> {
      const key = 'signIn';

      try {
        commit('SET_PENDING', { key });
        const { user, token } = await AuthProvider.signIn(payload);
        commit('SET_AUTH_DATA', { user, token });

        return true;
      } catch (errors) {
        commit('SET_ERRORS', { key, errors });
        return false;
      } finally {
        commit('SET_PENDING', { key, value: false });
      }
    },

    async signUp ({ commit }, payload: any): Promise<any> {
      const key = 'signUp';

      try {
        commit('SET_PENDING', { key });
        const { user } = await AuthProvider.signUp(payload);
        commit('SET_AUTH_DATA', { user });

        return true;
      } catch (errors) {
        commit('SET_ERRORS', { key, errors });
        return false;
      } finally {
        commit('SET_PENDING', { key, value: false });
      }
    },

    signOut ({ commit, dispatch }): boolean {
      const key = 'signOut';

      commit('SET_PENDING', { key });
      // const result = await AuthProvider.signOut();
      // commit('SET_PENDING', { key, value: false });

      // if (!result) {
      //   commit('SET_ERRORS', { key, errors: ['Can\'t sign out!'] });
      //   return false;
      // }
      dispatch('doSignOut');
      return true;
    },

    clearErrors ({ commit }): void {
      commit('CLEAR_ERRORS');
    },

    clearErrorsByKey ({ commit }, key: string): void {
      commit('CLEAR_ERRORS_BY_KEY', key);
    },

    doSignOut ({ commit }): void {
      commit('SIGN_OUT');
      commit('CLEAR_ERRORS');
    },
  },

  mutations: {
    SET_AUTH_DATA (state, { user, token }: any) {
      if (user) {
        state.user = user;

        if (token) {
          state.token = token;
          StorageService.set('token', token);
          StorageService.watch('token', (token: string) => console.table({ token }));
        }

        SessionStorage.set('sessionId', nanoid(16));
        SessionStorage.set('email', user.email);
      }
    },

    SIGN_OUT (state) {
      state.user = {
        id: '',
        email: ''
      };
      state.token = null;
      StorageService.remove('token');
      SessionStorage.clear();
    },

    SET_ERRORS (state, { key, errors }) {
      console.log({ errors });
      state.errors[key] = JSON.parse(errors.message);
    },

    CLEAR_ERRORS (state) {
      for (const key in state.errors) {
        if (state.errors[key]) state.errors[key] = {};
      }
    },

    CLEAR_ERRORS_BY_KEY (state, key: Scalars['String']) {
      state.errors[key] = {};
    },

    SET_PENDING (state, { key, value = true }: PendingObject) {
      state.pending[key] = value;
    },
  },

  modules: {},
};

export default module;
