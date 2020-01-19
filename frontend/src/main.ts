/* eslint-disable no-restricted-syntax */
import Vue from 'vue';
import Meta from 'vue-meta';
import Bus from 'vue-bus';
import VueClipboard from 'vue-clipboard2';

import 'simplebar/dist/simplebar.min.css';

import router from './router';
import store from './store';
import i18n from './locales';

import App from './App.vue';

import vuetify from './plugins/vuetify';

import { global } from './mixins';
import filters from './utils/filters';

import './pwa/registerServiceWorker';

Vue.config.productionTip = false;
VueClipboard.config.autoSetContainer = true;

Vue.use(Meta);
Vue.use(Bus);
Vue.use(VueClipboard);

Vue.mixin(global);

for (const key in filters) {
  if (filters[key]) {
    const filter = filters[key];
    Vue.filter(key, filter);
  }
}

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#wrapper');
