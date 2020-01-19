import { RouteConfig } from 'vue-router/types';

import { createNameSpace } from '@/utils/helpers';

import Wrapper from '@/views/account/wrapper.vue';
import Account from '@/views/account/index.vue';

export const nameSpace = createNameSpace('Account');


const routes: Array<RouteConfig> = [
  {
    path: '/account',
    component: Wrapper,
    children: [
      {
        path: '',
        name: nameSpace.with(''),
        component: Account,
        props: ({ query }) => ({ ...query }),
      },
    ]
  }
];

export default routes;
