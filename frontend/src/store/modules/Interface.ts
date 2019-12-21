/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex/types';
import { make } from 'vuex-pathify';

import { RootState } from '@/types/store';
import { ColorSchemes } from '@/types/enums';


const namespaced = true;

const state: RootState['Interface'] = {
  drawer: {
    left: true,
    leftMini: true,
    right: false,
  },
  theme: ColorSchemes.LIGHT,
};

const getters: GetterTree<RootState['Interface'], RootState> = {
  isDark: state => state.theme === ColorSchemes.DARK,
};

const actions: ActionTree<RootState['Interface'], RootState> = {
  ...make.actions(state),
};

const mutations: MutationTree<RootState['Interface']> = {
  ...make.mutations(state),
};

const modules = {};

const module: Module<RootState['Interface'], RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules,
};

export default module;
