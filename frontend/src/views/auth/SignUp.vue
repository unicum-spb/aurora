<template>
  <v-layout
    justify-center
    class="signUp"
  >
    <v-card
      flat
      class="auth__card"
    >
      <v-toolbar
        flat
        height="auto"
        class="auth-toolbar"
      >
        <v-toolbar-title class="auth-toolbar__title">
          {{ $t('auth.sign_up') }}
        </v-toolbar-title>
        <div class="auth-toolbar__logo">
          LOGO
        </div>
      </v-toolbar>

      <SignUp-Form />

      <v-layout
        justify-center
        align-center
        class="auth-form__footer"
      >
        <v-flex sm2>
          <router-link
            :to="{ name: 'Auth/login' }"
            class="auth-form__footer-link"
          >
            {{ $t('auth.login') }}
          </router-link>
        </v-flex>

        <v-flex
          sm1
          class="text-sm-center"
          style="max-width:12px"
        >
          <v-divider
            vertical
            class="auth-form__divider"
          />
        </v-flex>

        <v-flex sm5>
          <router-link
            :to="{ name: 'Auth/passwordNew' }"
            class="auth-form__footer-link"
          >
            {{ $t('auth.recover_password') }}
          </router-link>
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

import { Meta } from '@/decorators';

import SignUpForm from './SignUpForm.vue';

@Component({
  inheritAttrs: false,
  components: {
    SignUpForm,
  },
})
export default class SignUp extends Vue {
  @Meta
  metaInfo () {
    return {
      title: this.$t('titles.auth.sign_up'),
      titleTemplate: `%s | ${this.$t('aurora')}`
    };
  }
}

</script>
