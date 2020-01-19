import { RouteConfig, Route } from 'vue-router/types';

import Wrapper from '@/views/home/wrapper.vue';
import Home from '@/views/home/index.vue';

import auth from './auth';
import reports from './reports';
import account from './account';


const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Wrapper,
    props: true,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        // redirect: { name: 'Auth/login' },
      },
    ]
  },

  ...auth,
  ...reports,
  ...account,

  {
    path: '*',
    beforeEnter (to: Route, from: Route, next: Function) {
      const dest = {
        name: 'Home',
      };
      return next(dest);
    },
  }
];

export default routes;
