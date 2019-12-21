<template>
  <div class="network-snackbar">
    <v-snackbar
      :value="show"
      :timeout="10000"
      right
      top
      multi-line
    >
      {{ $t('errors.fetching_server_errors') }}<br>
      {{ $t('reload_page') }}
      <v-btn
        color="white"
        large
        text
        @click="callReloadPage"
      >
        {{ $t('refresh') }}
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class NetworkSnackbar extends Vue {
  show: boolean = false;

  created () {
    this.$bus.on('internal-server-error', this.onError);
  }

  onError (event: any) {
    this.show = [ 'failed', 'code_500' ].includes(event.type);
  }

  callReloadPage () {
    return window.location.reload();
  }
}

</script>

<style lang="scss">

.network-snackbar {
  .v-snack__wrapper {
    background-color: #b00020;
    border-radius: 4px;
  }
}

</style>
