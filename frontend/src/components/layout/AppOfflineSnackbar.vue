<template>
  <v-snackbar
    :value="isOffline"
    :timeout="0"
    bottom
    right
  >
    Offline Mode
  </v-snackbar>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class AppOfflineSnackbar extends Vue {
  isOffline: NavigatorOnLine['onLine'] = false;

  updateOnlineStatus (): void {
    const condition = navigator.onLine ? 'online' : 'offline';
    console.log(`Network status is ${condition}`);
    this.isOffline = !navigator.onLine;
  }

  created () {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }
}

</script>
