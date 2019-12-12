<template>
  <v-app id="wrapper">
    <!-- <App-Sidebar /> -->

    <!-- <App-Header /> -->

    <!-- <v-toolbar clipped-left app absolute>
      <v-toolbar-title>Vuetify</v-toolbar-title>
    </v-toolbar> -->

    <v-fade-transition
      appear
      mode="out-in"
      :duration="200"
    >
      <router-view v-if="!pending" />
    </v-fade-transition>

    <!-- <App-Notification /> -->

    <!-- <App-Offline-Snackbar /> -->

    <!-- <App-Network-Error-SnackBar /> -->

    <!-- <App-Modal-Dialog /> -->
  </v-app>
</template>

<script lang="ts">

import { Route } from 'vue-router/types';

import { Vue, Component, Watch } from 'vue-property-decorator';
import { Get, Sync, Call } from 'vuex-pathify';

import EventService from '@/services/event';

// import AppHeader from './components/layout/AppHeader/index.vue';
// import AppSidebar from './components/layout/AppSidebar/index.vue';
// import AppNotification from './components/layout/AppNotification/index.vue';
// import AppOfflineSnackbar from './components/layout/AppOfflineSnackbar.vue';
// import AppNetworkErrorSnackBar from './components/layout/AppNetworkErrorSnackBar.vue';


@Component({
  inheritAttrs: false,
  components: {
    // AppHeader,
    // AppSidebar,
    // AppNotification,
    // AppOfflineSnackbar,
    // AppNetworkErrorSnackBar,
  },
})
export default class AuroraApp extends Vue {
  get pending () {
    return this.$store.state.Auth.pending.getCurrentUser;
  }

  @Watch('$route', { immediate: true, deep: true })
  onRouteChange ({ name }: Route): void {
  }

  @Watch('dark', { immediate: true })
  onDarkChange (val: boolean) {
    this.$vuetify.theme.dark = val;
  }

  @Call('Auth/getCurrentUser')
  callAuthGetCurrentUser!: () => Promise<boolean>;

  created () {
    EventService.on('authentication-error', (data: any) => this.$store.dispatch('Auth/signOut'));

    this.callAuthGetCurrentUser();

    document.addEventListener('keyup', (event: KeyboardEvent): void => {
      if (!event.key) return;

      const key = event.key.toLowerCase();
      const isEscape = key === 'escape';

      if (isEscape) this.$bus.emit('on-esc', event);
    });
  }
}

</script>

<style lang="scss">

[v-cloak] {
  display: none;
}

html {
  overflow: hidden;
}

::-webkit-scrollbar-button {
  background-image: none;
  background-repeat: no-repeat;
  width: 4px;
  height: 0px;
}

::-webkit-scrollbar-track {
  background-color: #fafafa;
  // box-shadow: 0px 0px 3px #000 inset;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #e0e0e0;
  background-position:center;
  background-repeat:no-repeat;
  &:hover {
  }
}

::-webkit-resizer {
  background-image: none;
  background-repeat:no-repeat;
  width: 7px;
  height: 0px
}

::-webkit-scrollbar {
  width: 0 !important;
}

.v-application--wrap {
  max-height: 100vh;
}

.v-content.main {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  font-size: 16px;
  -webkit-text-fill-color: #000;
  transition: background-color 5000s ease-in-out 0s;
}

.v-btn {
  &.v-btn--floating {
    border-radius: 50%;
  }
}

.selectable-list-data {
  user-select: initial !important;
}

.v-select-list.v-card {
  border: none !important;
}

.theme--light {
  &.v-application {
    background-color: #f1f3f4 !important;
  }
  .v-text-field--box {
    &:not(.v-input--is-focused) {
      > .v-input__control > .v-input__slot {
        &::before {
          border-color: transparent;
        }
        &:hover {
          &:before {
            border-color: transparent;
          }
        }
      }
    }
  }
  .v-messages {
    color: rgba(0,0,0,0.6);
  }
  .v-datatable thead th.column.sortable.active {
    color: rgba(0,0,0,0.87);
    font-weight: bold;
  }
  .v-input--is-disabled {
    .v-label,
    input,
    textarea {
      -webkit-text-fill-color: rgba(0,0,0,0.38);
    }
  }
}

.theme--dark {
  &.v-list-item--active {
    &::before {
      content: none;
    }
  }
}

.v-text-field--outline {
  .v-label--active {
    transform: translateY(-8px) scale(0.75);
  }
  > .v-input__control > .v-input__slot {
    border-width: 1px !important;
  }
  input {
    padding: 8px 0 10px;
  }
}

.v-sheet {
  border-radius: 4px;
}

.v-textarea.v-text-field--enclosed.v-text-field--outlined textarea {
  margin-top: 6px !important;
  margin-bottom: 2px !important;
}

.v-list__tile__title,
.v-list__tile__sub-title {
  white-space: initial;
}

.v-select__selection--comma {
  align-items: center;
  display: inline-flex;
  margin: 4px 4px 10px 0;
}

.v-tabs {
  &__item {
    text-transform: initial;
  }
  &__bar {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.v-dialog--fullscreen .v-card {
  border-radius: 0;
  border: none;
}

.v-card {
  .v-datatable__expand-content &,
  .v-window-item & {
    background-color: inherit;
  }
}

.v-icon--left {
  margin-right: 6px;
}
.v-icon--right {
  margin-left: 6px;
}
.v-btn--icon {
  border-radius: 50%;
}

.v-menu__content {
  border-radius: 4px;
}

.layout {
  &._centered {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 10px;
  }
  &._wide {
    max-width: 1180px;
  }
}

.v-application code {
  box-shadow: inherit;
  color: inherit;
  font-size: inherit;
  display: inherit;
  background-color: inherit;
  font-weight: inherit;
}

.slide-in-y-reverse-fade-out {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(.25,.8,.50,1)
  }

  &-move {
    transition: transform .6s
  }

  &-enter {
    opacity: 0;
    transform: translateY(15px);
  }
  &-leave-to {
    opacity: 0;
  }
}

</style>
