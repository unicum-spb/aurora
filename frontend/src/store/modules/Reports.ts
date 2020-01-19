/* eslint-disable */

/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */

import { Module } from 'vuex/types';

import { RootState } from '@/types/store';
import { QuantumReportModel, ReportFieldModel } from '@/types/api';
import { PendingObject } from '@/types/shared.d';

import { ReportsProvider } from '@/providers';
import { ComparedQuantumReportModel, Dictionary, Scalars } from '@/types';


const module: Module<RootState['Reports'], RootState> = {
  namespaced: true,

  state: {
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
    types: [],
    compare: [],
    pending: {
      create: false,
      getAll: true,
      getById: true,
      getByListOfId: true,
      removeByListOfId: false,
    },
    errors: {},
  },

  getters: {
    compared: state => (titleKey: ReportFieldModel['title']) => {
      const dates = state.compare.map(({ meta }) => meta.date);

      const founded = state.compare
        .map(({ reports }) => reports.find(report => report.title === titleKey))
        .map(report => report?.fields)
        .reduce((prev, current) => {
          if (prev && current) {
            prev.push(...current)
            return prev;
          }
        }, [])

      const result: Array<ComparedQuantumReportModel> = [];

      if (founded && founded.length) {
        const keys = Array.from(new Set(founded.map(field => field.title)))
        const source = keys.map(title => founded.filter(field => field.title === title));

        source.forEach(reportPack => {
          const initial: ComparedQuantumReportModel = {
            dates,
            title: '',
            value: [],
            min: [],
            max: [],
          }

          const preResult = reportPack
            .reduce((prev, current) => {
              prev.value.push(current.value);
              prev.min.push(current.min);
              prev.max.push(current.max);
              prev.title = current.title;
              return prev;
            }, initial)

          result.push(preResult);
        });
      }

      return result;
    },
  },

  actions: {
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
      const key = 'getByListOfId';

      // TODO заделать получение отчёта другого пользователя
      const { id: userId } = rootState.Auth.user;

      commit('SET_PENDING', { key });
      const reports = await ReportsProvider.getByListOfId(userId, reportIds);
      commit('SET_COMPARED', reports);

      commit('SET_PENDING', { key, value: false });
      return true;
    },

    async removeByListOfId({ commit, rootState }, reportIds: ReadonlyArray<QuantumReportModel['id']>) {
      const key = 'removeByListOfId';

      const { id: userId } = rootState.Auth.user;

      commit('SET_PENDING', { key });
      const reports = await ReportsProvider.removeByListOfId(userId, reportIds);
      // commit('SET_COMPARED', reports);

      commit('SET_PENDING', { key, value: false });
      return true;
    },

    async getTypes({ commit, rootState }) {
      const key = 'getTypes';

      const { id: userId } = rootState.Auth.user;

      commit('SET_PENDING', { key });
      const types = await ReportsProvider.getTypes(userId);
      commit('SET_TYPES', types);

      commit('SET_PENDING', { key, value: false });
      return true;
    },
  },

  mutations: {
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
      state.selected = reports[0];
    },

    SET_TYPES(state, types: Array<Dictionary<Scalars['String']>>) {
      state.types = types;
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

    SET_PENDING(state, { key, value = true }: PendingObject) {
      state.pending[key] = value;
    }
  },

  modules: {},
};

export default module;
