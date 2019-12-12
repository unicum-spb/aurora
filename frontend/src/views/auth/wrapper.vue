<template>
  <v-content
    fill-height
    class="auth"
  >
    <v-container
      fill-height
      pa-0
    >
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Route } from 'vue-router/types';

import { Vue, Component } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class AuthWrapper extends Vue {
  beforeRouteLeave (to: Route, from: Route, next: Function) {
    this.$store.dispatch('Auth/clearErrors');
    next();
  }
}

</script>

<style lang="scss">

.auth {
  background-color: #f1f3f4;
  &.v-dialog {
    background-color: transparent;
    border-radius: 8px;
  }
  &__card {
    margin-top: 100px;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none;
  }

  .auth-toolbar {
    position: relative;
    background-color: white;
    border: solid 1px #dadcdf;
    border-bottom: none;
    border-top-left-radius: 8px !important;
    border-top-right-radius: 8px !important;

    .v-toolbar__content {
      height: auto !important;
      padding-top: 48px;
      padding-bottom: 16px;
    }
    &._in {
      .v-toolbar__content {
        padding-top: 16px;
      }
    }

    &__title {
      width: 100%;
      text-align: center;
      line-height: 1;
    }

    &__logo {
      position: absolute;
      left: 50%;
      top: -36px;
      display: flex;
      align-items: center;
      width: 67px;
      height: 67px;
      padding-left: 12px;
      background-color: #fff;
      border: solid 1px #dadcdf;
      border-radius: 50%;
      transform: translateX(-50%);
    }
  }

  .auth-form {
    width: 355px;
    padding: 24px 20px 28px 20px;
    border-radius: 8px;
    border: solid 1px #dadcdf;
    background-color: #ffffff;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;

    &._in {
      padding-top: 12px;
    }

    &__title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.87);
    }

    &__divider {
      min-height: 4px;
      margin-bottom: 4px;
      border-color: rgba(0, 0, 0, 0.38);
      border-right-width: 1px;
      border-left-width: 3px;
    }

    &__submit {
      height: 54px;
      margin-top: 12px;
      margin-bottom: 0;
    }

    &__footer {
      margin-top: 6px;
      min-height: 32px;
    }

    &__footer-link {
      display: block;
      margin: 0 auto;
      text-align: center;
      font-size: 13px;
      color: #32009d;
      text-decoration: none;
    }
  }
}

</style>
