import Vue from 'vue';
import Vuex from 'vuex';

import Environment from '@/services/environment';

import modules from './modules';
import plugins from './plugins';

import { RootState } from '@/types/store';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  modules,
  plugins,
  strict: !Environment.isProduction,
});
