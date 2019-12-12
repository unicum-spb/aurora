/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex/types';

import nanoid from 'nanoid';

import { RootState } from '@/types/store';
import { PendingObject } from '@/types/shared';

import { SessionStorage, StorageService } from '@/services/storage';

import { AuthProvider } from '@/providers';

const namespaced = true;

const state: RootState['Auth'] = {
  token: '',
  user: {
    id: '',
    email: ''
  },
  errors: {
    signUp: [],
    signIn: [],
    signOut: [],
    recover: [],
  },
  pending: {
    getCurrentUser: true,
    signUp: false,
    signIn: false,
    signOut: false,
    recover: false,
  },
};

const getters: GetterTree<RootState['Auth'], RootState> = {
  isLoggedIn: state => !!state.token,
};

const actions: ActionTree<RootState['Auth'], RootState> = {
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

    commit('SET_PENDING', { key });
    const { user, token, errors } = await AuthProvider.signIn(payload);
    commit('SET_PENDING', { key, value: false });

    if (errors && errors.length) {
      commit('SET_ERRORS', { key, errors });
      return false;
    }
    commit('SET_AUTH_DATA', { user, token });
    return true;
  },

  async signUp ({ commit }, payload: any): Promise<any> {
    const key = 'signUp';

    commit('SET_PENDING', { key });
    const { user, workspace, errors } = await AuthProvider.signUp(payload);
    commit('SET_PENDING', { key, value: false });

    if (errors && errors.length) {
      commit('SET_ERRORS', { key, errors });
      return false;
    } if (workspace) {
      commit('SET_AUTH_DATA', { user });
      return workspace;
    }
    return false;
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
};

const mutations: MutationTree<RootState['Auth']> = {
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
    state.user = {};
    state.token = null;
    StorageService.remove('token');
    SessionStorage.clear();
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
  }
};

const modules = {};

const module: Module<RootState['Auth'], RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules,
};

export default module;
