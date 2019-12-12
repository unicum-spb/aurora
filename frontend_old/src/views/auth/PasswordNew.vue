<template>
  <v-layout
    justify-center
    class="recover"
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
          {{ $t('titles.auth.password_new') }}
        </v-toolbar-title>
        <div class="auth-toolbar__logo">
          LOGO
        </div>
      </v-toolbar>

      <v-form
        ref="form"
        lazy-validation
        class="auth-form"
        @submit.prevent="recover"
      >
        <v-text-field
          v-model="user.email"
          name="email"
          type="email"
          label="E-mail"
          color="#6200ee"
          :rules="[ rules.required ]"
          :loading="pending"
          :error-messages="errors.email"
          filled
        />

        <v-btn
          block
          :loading="pending"
          type="submit"
          color="primary"
          class="auth-form__submit"
        >
          {{ $t('auth.send_to_email') }}
        </v-btn>
      </v-form>

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
            {{ $t('auth.sign_in') }}
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
            :to="{ name: 'Auth/signUp' }"
            class="auth-form__footer-link"
          >
            {{ $t('auth.register') }}
          </router-link>
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Get, Call } from 'vuex-pathify';

import { Dictionary } from '@/types';

import { Meta } from '@/decorators';
import { required } from '@/utils/validators';


@Component({
  inheritAttrs: false,
  components: {
  },
})
export default class RecoverPassword extends Vue {
  user: Dictionary<string> = {
    email: '',
  };

  rules: any = {
    required,
  };

  get errors (): any {
    return this.$store.getters['Auth/getErrorsByKey']('recover');
  }

  get pending () {
    return this.$store.state.Auth.pending.signUp;
  }

  @Call('Auth/recover') callAuthRecover!: (params: any) => Promise<any>

  async recover (): Promise<void> {
    // @ts-ignore
    const isValid = this.$refs.form.validate();
    if (isValid) {
      const result = await this.callAuthRecover(this.user);
      console.log(result);
    }
  }

  @Meta
  metaInfo () {
    return {
      title: this.$t('titles.auth.password_new'),
      titleTemplate: `%s | ${this.$t('aplaut')}`
    };
  }
}

</script>

<style lang="scss">

.recover {}

</style>
