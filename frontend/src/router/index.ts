import { RouterOptions } from 'vue-router/types';

import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';

import { checkAuth } from './guards';
import { parseQuery } from './query';
import scrollBehavior from './scrollBehavior';

Vue.use(Router);

const options: RouterOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  parseQuery,
  scrollBehavior,
};

const router = new Router(options);

router.beforeEach(checkAuth);

export default router;
