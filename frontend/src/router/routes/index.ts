import { RouteConfig, Route } from 'vue-router/types';

import Wrapper from '@/views/home/wrapper.vue';
import Home from '@/views/home/index.vue';

import auth from './auth';

const routes: RouteConfig[] = [
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

  {
    path: '*',
    beforeEnter (to: Route, from: Route, next: Function) {
      const dest = {
        name: 'Workspace/all',
      };
      return next(dest);
    },
  }
];

export default routes;
