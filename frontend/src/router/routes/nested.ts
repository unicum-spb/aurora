import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const nestedRoutes: RouteConfig = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: 'nested',
    icon: 'nested'
  }
}

export default nestedRoutes
