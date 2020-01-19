import { RouteConfig } from 'vue-router/types';

import { createNameSpace } from '@/utils/helpers';

import Wrapper from '@/views/reports/wrapper.vue';

import ReportRoot from '@/views/reports/index.vue';
import ReportCreate from '@/views/reports/create.vue';
import ReportId from '@/views/reports/id.vue';
import ReportCompare from '@/views/reports/compare.vue';


export const nameSpace = createNameSpace('Reports');


const routes: Array<RouteConfig> = [
  {
    path: '/reports',
    component: Wrapper,
    children: [
      {
        path: '',
        name: nameSpace.with('list'),
        component: ReportRoot,
        props: ({ query }) => ({
          filter: query.filter,
        }),
      },

      {
        path: 'create',
        name: nameSpace.with('create'),
        redirect: {
          name: nameSpace.with('list'),
          query: { 'add-dialog': 'true' }
        }
      },

      {
        path: 'show/:reportId',
        name: nameSpace.with('id'),
        component: ReportId,
        props: ({ params }) => ({
          reportId: params.reportId,
        }),
      },

      {
        path: 'compare',
        name: nameSpace.with('compare'),
        component: ReportCompare,
        props: ({ query }) => ({
          reportIds: query.reportIds,
        }),
      },
    ],
  }
];

export default routes;
