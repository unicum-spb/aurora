import { RouteConfig } from 'vue-router/types';

import { createNameSpace } from '@/utils/helpers';

import { StorageService } from '@/services/storage';

import Wrapper from '@/views/auth/wrapper.vue';
import SignUp from '@/views/auth/SignUp.vue';
import SignIn from '@/views/auth/SignIn.vue';
import PasswordNew from '@/views/auth/PasswordNew.vue';
import SignOut from '@/views/auth/SignOut.vue';

import Auth from '@/views/auth/index.vue';

export const nameSpace = createNameSpace('Auth');


const routes: Array<RouteConfig> = [
  {
    path: '/auth',
    component: Wrapper,
    beforeEnter (to, from, next) {
      if (to.name !== 'Auth/signOut' && StorageService.contains('token')) {
        const dest = {
          name: 'Home',
        };
        return next(dest);
      }
      return next();
    },

    children: [
      {
        path: '',
        name: nameSpace.with(''),
        component: Auth,
        meta: { allowAnonymous: true },
        redirect: { name: nameSpace.with('login') },
        props: ({ query }) => ({ ...query }),
      },

      {
        path: 'sign-up',
        name: nameSpace.with('signUp'),
        component: SignUp,
        meta: { allowAnonymous: true },
        props: ({ query }) => ({ ...query }),
      },

      {
        path: 'login',
        name: nameSpace.with('login'),
        component: SignIn,
        meta: { allowAnonymous: true },
        props: ({ query }) => ({ ...query }),
      },

      {
        path: 'password/new',
        alias: 'password',
        name: nameSpace.with('passwordNew'),
        component: PasswordNew,
        meta: { allowAnonymous: true },
        props: ({ query }) => ({ ...query }),
      },

      {
        path: 'sign-out',
        name: nameSpace.with('signOut'),
        component: SignOut,
      },
    ]
  }
];

export default routes;
