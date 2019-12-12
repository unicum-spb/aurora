/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */

import { Module, GetterTree, ActionTree, MutationTree } from 'vuex/types';

import { TypeQuantumReportModel } from '@/types';
import { PendingObject } from '@/types/shared.d';
import { RootState } from '@/types/store';

import { ReportsProvider } from '@/providers';


const namespaced = true;

const state: RootState['Reports'] = {
  reports: [],
  pending: {
    create: false
  },
  errors: {},
};

const getters: GetterTree<RootState['Reports'], RootState> = {};

const actions: ActionTree<RootState['Reports'], RootState> = {
  async create ({ commit }, payload: any) {
    const key = 'signIn';

    commit('SET_PENDING', { key });
    const reports = await ReportsProvider.create(payload);
    commit('SET_PENDING', { key, value: false });

    commit('SET_REPORTS', reports);
    return true;
  }
};

const mutations: MutationTree<RootState['Reports']> = {
  SET_REPORTS (state, reports: Array<TypeQuantumReportModel>) {
    state.reports = reports;
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

const module: Module<RootState['Reports'], RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules,
};

export default module;
