<template>
  <v-dialog
    :value="alert.id.length"
    :persistent="!alert.cancellable"
    :fullscreen="alert.fullscreen"
    max-width="320px"
  >
    <v-card>
      <v-card-title class="headline">
        {{ $t(alert.title) }}
      </v-card-title>
      <v-card-text>{{ $t(alert.message) }}</v-card-text>

      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn
          v-if="alert.cancellable"
          text
          @click="cancel"
        >
          {{ $t('cancel') }}
        </v-btn>
        <v-btn
          color="primary"
          @click="confirm"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

import { Alert } from '@/types/alert.d';

@Component({ inheritAttrs: false })
export default class AppModalDialog extends Vue {
  show: boolean = true;

  alert: Alert = {
    id: '',
    title: '',
    message: '',
    fullscreen: false,
    cancellable: true,
    resolve: Promise.resolve,
    reject: Promise.reject,
  }

  created () {
    this.$bus.on('call-alert', this.fillAlert);
  }

  fillAlert (alert: Alert): void {
    this.alert = Object.assign(alert);
  }

  cancel () {
    const {
      title,
      message,
      cancellable,
      fullscreen,
      reject
    } = this.alert;
    if (reject) {
      reject({
        title,
        message,
        cancellable,
        fullscreen
      });
    }
    this.reset();
  }

  confirm () {
    const {
      title,
      message,
      cancellable,
      fullscreen,
      resolve
    } = this.alert;
    if (resolve) {
      resolve({
        title,
        message,
        cancellable,
        fullscreen,
      });
    }
    this.reset();
  }

  reset () {
    this.alert.id = '';
    setTimeout(() => {
      this.alert = {
        id: '',
        title: '',
        message: '',
        fullscreen: false,
        cancellable: true,
        resolve: Promise.resolve,
        reject: Promise.reject,
      };
    }, 300);
  }
}

</script>

<style lang="scss">

.app-modal-dialog {}

</style>
