<template>
  <v-app id="wrapper">
    <App-Header />

    <App-Sidebar />

    <v-fade-transition
      :duration="200"
      mode="out-in"
      appear
    >
      <router-view v-if="!pending" />
    </v-fade-transition>

    <App-Notification />

    <App-Offline-Snackbar />

    <App-Network-Error-SnackBar />

    <App-Modal-Dialog />
  </v-app>
</template>

<script lang="ts">

import { Route } from 'vue-router/types';

import { Vue, Component, Watch } from 'vue-property-decorator';
import { Get, Sync, Call } from 'vuex-pathify';

import { Scalars } from './types';

import EventService from '@/services/event';

import AppHeader from './components/layout/AppHeader/index.vue';
import AppSidebar from './components/layout/AppSidebar.vue';
import AppModalDialog from './components/layout/AppModalDialog.vue';
import AppNotification from './components/layout/AppNotification/index.vue';
import AppOfflineSnackbar from './components/layout/AppOfflineSnackbar.vue';
import AppNetworkErrorSnackBar from './components/layout/AppNetworkErrorSnackBar.vue';
import { Alert } from './types/alert';


@Component({
  inheritAttrs: false,
  components: {
    AppHeader,
    AppSidebar,
    AppModalDialog,
    AppNotification,
    AppOfflineSnackbar,
    AppNetworkErrorSnackBar,
  },
})
export default class AuroraApp extends Vue {
  public get pending () {
    return this.$store.state.Auth.pending.getCurrentUser;
  }

  @Watch('dark', { immediate: true })
  public onDarkChange (val: Scalars['Boolean']) {
    this.$vuetify.theme.dark = val;
  }

  @Call('Auth/getCurrentUser')
  public callAuthGetCurrentUser!: () => Promise<any>;

  created () {
    // Проброс событий из EventService в $bus
    EventService.on('authentication-error', (data: any) => {
      this.$store.dispatch('Auth/signOut');
      window.location.href = '/auth/login';
    });

    EventService.on('change-language', (data: any) => this.$bus.emit('change-language', data));
    EventService.on('internal-server-error', (data: any) => this.$bus.emit('internal-server-error', data));
    EventService.on('token-auth-state', (data: any) => this.$bus.emit('token-auth-state', data));
    EventService.on('call-notification', (data: Notification) => this.$bus.emit('call-notification', data));
    EventService.on('call-alert', (data: Alert) => this.$bus.emit('call-alert', data));

    this.$bus.on('on-esc', (event: KeyboardEvent) => EventService.emit('on-esc', event));

    this.callAuthGetCurrentUser();

    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (!event.key) return;

      const key = event.key.toLowerCase();
      const isEscape = key === 'escape';

      if (isEscape) { this.$bus.emit('on-esc', event); }
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

.v-content {
  flex: 1 1 auto !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  max-height: 100vh;
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

.v-dialog > .v-card > .v-card__title {
  padding: 16px !important;
  padding-right: 16px !important;
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

// .theme--light {
//   &.v-application {
//     background-color: #f1f3f4 !important;
//   }
//   .v-text-field--box {
//     &:not(.v-input--is-focused) {
//       > .v-input__control > .v-input__slot {
//         &::before {
//           border-color: transparent;
//         }
//         &:hover {
//           &:before {
//             border-color: transparent;
//           }
//         }
//       }
//     }
//   }
//   .v-messages {
//     color: rgba(0,0,0,0.6);
//   }
//   .v-datatable thead th.column.sortable.active {
//     color: rgba(0,0,0,0.87);
//     font-weight: bold;
//   }
//   .v-input--is-disabled {
//     .v-label,
//     input,
//     textarea {
//       -webkit-text-fill-color: rgba(0,0,0,0.38);
//     }
//   }
// }

// .theme--dark {
//   &.v-list-item--active {
//     &::before {
//       content: none;
//     }
//   }
// }

// .v-text-field--outline {
//   .v-label--active {
//     transform: translateY(-8px) scale(0.75);
//   }
//   > .v-input__control > .v-input__slot {
//     border-width: 1px !important;
//   }
//   input {
//     padding: 8px 0 10px;
//   }
// }

// .v-sheet {
//   border-radius: 4px;
// }

// .v-textarea.v-text-field--enclosed.v-text-field--outlined textarea {
//   margin-top: 6px !important;
//   margin-bottom: 2px !important;
// }

// .v-list__tile__title,
// .v-list__tile__sub-title {
//   white-space: initial;
// }

// .v-select__selection--comma {
//   align-items: center;
//   display: inline-flex;
//   margin: 4px 4px 10px 0;
// }

// .v-tabs {
//   &__item {
//     text-transform: initial;
//   }
//   &__bar {
//     border-bottom-left-radius: 0;
//     border-bottom-right-radius: 0;
//   }
// }

// .v-dialog--fullscreen .v-card {
//   border-radius: 0;
//   border: none;
// }

// .v-card {
//   .v-datatable__expand-content &,
//   .v-window-item & {
//     background-color: inherit;
//   }
// }

// .v-icon--left {
//   margin-right: 6px;
// }
// .v-icon--right {
//   margin-left: 6px;
// }
// .v-btn--icon {
//   border-radius: 50%;
// }

// .v-menu__content {
//   border-radius: 4px;
// }

// .layout {
//   &._centered {
//     width: 100%;
//     max-width: 960px;
//     margin: 0 auto;
//     padding: 0 10px;
//   }
//   &._wide {
//     max-width: 1180px;
//   }
// }

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
