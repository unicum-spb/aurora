<template>
  <v-navigation-drawer
    v-if="logged"
    ref="sidebar"
    :value="drawer"
    :mini-variant="drawerLeftMini"
    stateless
    hide-overlay
    app
    class="sidebar"
  >
    <v-list
      dense
      nav
      class="d-flex flex-column fill-height"
    >
      <v-list-item
        link
        class="py-1"
        @click.exact="drawerLeftMini = !drawerLeftMini"
      >
        <v-list-item-action>
          <v-icon>list</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            LOGO
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader class="mt-4">
        PROFILE
      </v-subheader>

      <v-list-item
        v-for="{ text, route, icon } in items"
        :key="icon"
        :to="route"
        link
      >
        <v-list-item-action>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title v-text="text" />
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-action>
          <v-icon>settings</v-icon>
        </v-list-item-action>

        <v-list-item-title>
          Settings
        </v-list-item-title>
      </v-list-item>

      <v-subheader class="mt-4">
        DOCTORS
      </v-subheader>

      <v-list-item
        v-for="{ avatar, firstName } in doctors"
        :key="firstName"
        link
      >
        <v-list-item-avatar>
          <img
            :src="`https://randomuser.me/api/portraits/men/${avatar}.jpg`"
            alt=""
          >
        </v-list-item-avatar>
        <v-list-item-title v-text="firstName" />
      </v-list-item>

      <v-list-item
        class="mt-4"
        link
      >
        <v-list-item-action>
          <v-icon>add</v-icon>
        </v-list-item-action>

        <v-list-item-title>
          Browse Channels
        </v-list-item-title>
      </v-list-item>

      <v-spacer />

      <App-Theme-Provider />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">

import { Location } from 'vue-router/types';

import { Vue, Component, Ref, Watch } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';

import AppThemeProvider from '@/AppThemeProvider.vue';

export type SidebarListItem = {
  icon?: string;
  text: string;
  route: Location;
}


@Component({
  inheritAttrs: false,
  components: {
    AppThemeProvider,
  }
})
export default class AppSidebar extends Vue {
  @Ref('sidebar') $sidebar!: this;

  @Get('Auth/isLoggedIn') logged!: boolean;
  @Get('Interface/drawer@left') drawer!: boolean;
  @Sync('Interface/drawer@leftMini') drawerLeftMini!: boolean;

  items: ReadonlyArray<SidebarListItem> = [
    {
      icon: 'trending_up',
      text: 'Reports',
      route: {
        name: 'Reports/list'
      },
    },
    {
      icon: 'subscriptions',
      text: 'Subscriptions',
      route: {},
    },
    {
      icon: 'history',
      text: 'History',
      route: {},
    },
  ];

  doctors: ReadonlyArray<any> = [
    { avatar: 28, firstName: 'Joseph' },
  ]
}

</script>

<style lang="scss">

.sidebar {
  .v-list-item {
    flex: none;
  }
}

</style>
