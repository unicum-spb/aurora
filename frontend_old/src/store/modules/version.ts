/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { ActionTree, GetterTree, MutationTree, Module } from 'vuex/types';
import { RootState } from '@/types/store';
import { VersionState } from '@/types/store/version.d';


const namespaced = true;

const state: VersionState = '0.1.0';

const getters: GetterTree<VersionState, RootState> = {};

const actions: ActionTree<VersionState, RootState> = {};

const mutations: MutationTree<VersionState> = {};

const modules = {};

const module: Module<VersionState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules,
};

export default module;
