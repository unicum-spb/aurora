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

import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import { Dictionary, Scalars } from '@/types';

import { required } from '@/utils/validators';

@Component({ inheritAttrs: false })
export default class SignInForm extends Vue {
  // from router
  @Prop({ default: '' }) confirm!: Scalars['String'];
  @Prop({ default: '' }) redirect!: Scalars['String'];

  // from parent
  @Prop({ default: false }) inApp!: Scalars['Boolean'];
  @Prop({ default: '' }) email!: Scalars['String'];

  @Ref('form') $form!: HTMLFormElement;

  showPassword: boolean = false;

  user: Dictionary<string> = {
    email: '',
    password: '',
  };

  rules: any = {
    required,
  };

  get pending () {
    return this.$store.state.Auth.pending.signIn;
  }

  get errors (): any {
    return this.$store.getters['Auth/getErrorsByKey']('signIn');
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

  async signIn (): Promise<void> {
    const { inApp, confirm, redirect, user } = this;
    const isValid = this.$form.validate();

    if (isValid) {
      const result = await this.callAuthSignIn(user);
      this.$emit('sign-in');

      if (result) {
        this.resetForm();

        if (confirm.length) {
          this.$router.push({ name: 'Home' });
          return;
        }

        if (redirect) {
          this.$router.push(redirect);
          return;
        }

        if (!inApp) {
          this.$router.push({ name: 'Home' });
        }
      } else {
        this.user.password = '';
      }
    }
  }

  resetForm () {
    this.showPassword = false;
    this.user = {
      email: '',
      password: '',
    };

    this.$form.resetValidation();
  }
}

</script>
