<template>
  <v-slide-y-transition mode="out-in">
    <v-app-bar
      v-if="logged"
      id="app-header"
      app
      clipped-right
      :class="computedHeaderClass"
    >
      <v-fade-transition
        mode="out-in"
        :duration="200"
      >
        <router-link
          v-if="!drawerLeft"
          :to="rootDestination"
          class="sidebar__logo"
        >
          logo
        </router-link>

        <App-Header-Breadcrumbs
          v-else
          :breadcrumbs="breadcrumbs"
        />
      </v-fade-transition>

      <v-spacer />

      <!-- <App-Header-Apps /> -->

      <!-- <App-Header-Notifications /> -->

      <App-Header-Accounts />

      <App-Header-Progress />
    </v-app-bar>
  </v-slide-y-transition>
</template>

<script lang="ts">

import { Location } from 'vue-router/types';

import { Vue, Component } from 'vue-property-decorator';
import { Get, Sync } from 'vuex-pathify';

// import AppHeaderApps          from './AppHeaderApps.vue';
import AppHeaderBreadcrumbs from './AppHeaderBreadcrumbs.vue';
import AppHeaderNotifications from './AppHeaderNotifications.vue';
import AppHeaderAccounts from './AppHeaderAccounts.vue';
import AppHeaderProgress from './AppHeaderProgress.vue';


@Component({
  inheritAttrs: false,
  components: {
    // AppHeaderApps,
    AppHeaderBreadcrumbs,
    AppHeaderNotifications,
    AppHeaderAccounts,
    AppHeaderProgress,
  },
})
export default class AppHeader extends Vue {
  breadcrumbs: Array<any> = [
    {
      name: '',
      params: {},
      query: {},
    },
  ];

  @Get('Auth/isLoggedIn') logged!: boolean;
  @Sync('Interface/drawer@left') drawerLeft!: boolean;
  @Sync('Interface/drawer@leftMini') drawerLeftMini!: boolean;
  @Sync('Interface/drawer@right') drawerRight!: boolean;

  get computedRouteName (): string {
    const { name } = this.$route;
    if (name) return name.replace(new RegExp('/', 'g'), '.').toLowerCase();
    return '';
  }

  get computedHeaderClass (): Array<any> {
    return [
      'app-header',
      { _left: !this.drawerLeft },
    ];
  }

  get rootDestination (): Location {
    const { params } = this.$route;

    return {
      name: params.workspaceId ? 'Workspace' : 'Home',
      params,
    };
  }

  created () {
    this.$bus.on('set-breadcrumbs', this.setBreadcrumbs);
  }

  setBreadcrumbs (payload: Array<any>): void {
    this.breadcrumbs.splice(0, this.breadcrumbs.length, ...payload);
  }
}

</script>

<style lang="scss">

.app-header {
  &.theme--light {
    background-color: #fff;
    border-color: rgba(0,0,0,0.12);

    .breadcrumbs-block__sections {
      span {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}


.app-header {
  border-bottom: solid 1px rgba(0,0,0,0.12);
  border-radius: 0 !important;
}

</style>
