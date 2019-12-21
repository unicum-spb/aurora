/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */

import { Module, GetterTree, ActionTree, MutationTree } from 'vuex/types';

import { RootState } from '@/types/store';
import { QuantumReportModel } from '@/types/api';
import { PendingObject } from '@/types/shared.d';

import { ReportsProvider } from '@/providers';


const namespaced = true;

const state: RootState['Reports'] = {
  list: [],
  selected: {
    id: '',
    userId: '',
    meta: {
      name: '',
      age: 0,
      date: '',
      sex: 'male',
      physique: { height: 0, weight: 0 }
    },
    reports: []
  },
  compare: [],
  pending: {
    create: false,
    getAll: true,
    getById: true,
  },
  errors: {},
};

const getters: GetterTree<RootState['Reports'], RootState> = {
  parsed: state => state.list,
  // compared: state => state.compare
  compared: (state): any => {
    const dates = state.compare.map(report => report.meta.date);
    return dates;
  }
};

const actions: ActionTree<RootState['Reports'], RootState> = {
  async create({ commit, rootState }, formData: FormData) {
    const key = 'create';

    const { id: userId } = rootState.Auth.user;

    commit('SET_PENDING', { key });
    const reports = await ReportsProvider.create({ userId, formData });
    commit('SET_REPORTS', reports);

    commit('SET_PENDING', { key, value: false });
    return true;
  },

  async getAll({ commit, rootState }) {
    const key = 'getAll';

    // TODO заделать получение отчёта другого пользователя
    const { id: userId } = rootState.Auth.user;

    commit('SET_PENDING', { key });
    const reports = await ReportsProvider.getAll(userId);
    commit('SET_REPORTS', reports);

    commit('SET_PENDING', { key, value: false });
    return true;
  },

  async getById({ commit, rootState }, reportId: QuantumReportModel['id']) {
    const key = 'getById';

    // TODO заделать получение отчёта другого пользователя
    const { id: userId } = rootState.Auth.user;

    commit('SET_PENDING', { key });
    const reports = await ReportsProvider.getById(userId, reportId);
    commit('SET_REPORT', reports);

    commit('SET_PENDING', { key, value: false });
    return true;
  },

  async getByListOfId({ commit, rootState }, reportIds: ReadonlyArray<QuantumReportModel['id']>) {
    const key = 'getById';

    // TODO заделать получение отчёта другого пользователя
    const { id: userId } = rootState.Auth.user;

    commit('SET_PENDING', { key });
    const reports = await ReportsProvider.getByListOfId(userId, reportIds);
    commit('SET_COMPARED', reports);

    commit('SET_PENDING', { key, value: false });
    return true;
  }
};

const mutations: MutationTree<RootState['Reports']> = {
  SET_REPORTS(state, reports: Array<QuantumReportModel>) {
    state.list = reports.sort((prev, next) => {
      if (prev.meta.date > next.meta.date) return -1;
      if (prev.meta.date < next.meta.date) return 1;
      return 0;
    });
  },

  SET_REPORT(state, report: QuantumReportModel) {
    state.selected = report;
  },

  SET_COMPARED(state, reports: Array<QuantumReportModel>) {
    state.compare = reports;
  },

  SET_ERRORS(state, { key, errors }) {
    state.errors[key] = errors;
  },

  CLEAR_ERRORS(state) {
    for (const key in state.errors) {
      if (state.errors[key]) state.errors[key] = [];
    }
  },

  CLEAR_ERRORS_BY_KEY(state, key: string) {
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
