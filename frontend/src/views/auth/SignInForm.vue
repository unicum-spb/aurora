<template>
  <v-form
    ref="form"
    lazy-validation
    :class="['auth-form', { '_in': inApp }]"
    @submit.prevent="signIn"
  >
    <v-text-field
      v-model="user.email"
      name="email"
      type="email"
      :label="$t('auth.e_mail')"
      color="#6200ee"
      :rules="[ rules.required ]"
      :disabled="pending"
      :error-messages="errors.email"
      filled
    />

    <v-text-field
      v-model="user.password"
      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
      :rules="[ rules.required ]"
      :type="showPassword ? 'text' : 'password'"
      :label="$t('auth.password')"
      :disabled="pending"
      :error-messages="errors.password"
      name="password"
      color="#6200ee"
      filled
      @click:append="showPassword = !showPassword"
    />

    <v-btn
      block
      :loading="pending"
      type="submit"
      color="primary"
      class="auth-form__submit"
    >
      {{ $t('auth.login') }}
    </v-btn>
  </v-form>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import { Dictionary } from '@/types';

import { required } from '@/utils/validators';

@Component({ inheritAttrs: false })
export default class SignInForm extends Vue {
  // from router
  @Prop({ default: '' }) confirm!: string;
  @Prop({ default: '' }) redirect!: string;

  // from parent
  @Prop({ default: false }) inApp!: boolean;
  @Prop({ default: '' }) email!: string;

  showPassword: boolean = false;

  user: Dictionary<string> = {
    email: '',
    password: '',
  };

  rules: any = {
    required,
  };

  get pending () {
    return false;
    // return this.$store.state.Auth.pending.signIn;
  }

  get errors (): any {
    return {};
    // return this.$store.getters['Auth/getErrorsByKey']('signIn');
  }

  @Watch('email', { immediate: true })
  onEmailChange (value: string) {
    this.user.email = value;
  }

  created () {
    const { confirm, email } = this;

    if (confirm.length) {
      this.user.email = decodeURI(confirm);
    }
    if (email.length) {
      this.user.email = decodeURI(email);
    }
  }

  @Call('Auth/signIn')
  callAuthSignIn!: (payload: any) => Promise<boolean>;

  async signIn () {
    const { inApp, confirm, redirect, user } = this;
    // @ts-ignore
    const isValid = this.$refs.form.validate();

    if (isValid) {
      const result = await this.callAuthSignIn(user);
      this.$emit('sign-in');

      if (result) {
        this.resetForm();

        if (confirm.length) {
          return this.$router.push({
            name: 'Workspace/all',
          });
        }

        if (redirect) return this.$router.push(redirect);

        if (!inApp) return this.$router.push({ name: 'Workspace/all' });
      } else {
        this.user.password = '';
      }
    }

    return isValid;
  }

  resetForm () {
    this.showPassword = false;
    this.user = {
      email: '',
      password: '',
    };
    // @ts-ignore
    this.$refs.form.resetValidation();
  }
}

</script>
