<template>
  <v-layout
    justify-center
  >
    <v-snackbar
      v-model="snackbar"
      :timeout="0"
      color="info"
      top
    >
      {{ $t('auth.email_sent') }}
      <v-btn
        dark
        text
        icon
        small
        @click="snackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

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
          {{ $t('auth.sign_in') }}
        </v-toolbar-title>
        <div class="auth-toolbar__logo">
          LOGO
        </div>
      </v-toolbar>

      <SignIn-Form v-bind="{ confirm, redirect }" />

      <v-layout
        justify-center
        align-center
        class="auth-form__footer"
      >
        <v-flex sm5>
          <router-link
            :to="{ name: 'Auth/signUp' }"
            class="auth-form__footer-link"
          >
            {{ $t('auth.register') }}
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

import { Vue, Component, Prop } from 'vue-property-decorator';
import { Meta } from '@/decorators';

import SignInForm from './SignInForm.vue';

@Component({
  inheritAttrs: false,
  components: {
    SignInForm,
  },
})
export default class SignIn extends Vue {
  // from router
  @Prop({ default: '' }) confirm!: string;
  @Prop({ default: null }) redirect!: string | null;

  snackbar: boolean = false;

  mounted () {
    this.snackbar = this.confirm.length > 0;
  }

  @Meta
  metaInfo () {
    return {
      title: this.$t('titles.auth.sign_in'),
      titleTemplate: `%s | ${this.$t('aurora')}`
    };
  }
}

</script>
