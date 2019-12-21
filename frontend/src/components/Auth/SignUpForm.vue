<template>
  <v-form
    ref="form"
    class="auth-form"
    @submit.prevent="signUp"
  >
    <v-text-field
      v-model="user.email"
      :label="$t('auth.e_mail')"
      :rules="[ rules.required ]"
      :disabled="pending"
      :error-messages="errors.email"
      name="email"
      type="email"
      color="#6200ee"
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

    <v-text-field
      v-model="user.passwordConfirmation"
      :rules="[ rules.required, rules.isEqualPassword ]"
      :type="showPassword ? 'text' : 'password'"
      :label="$t('auth.confirm_password')"
      :disabled="pending"
      :error-messages="errors.password_confirmation"
      name="password"
      color="#6200ee"
      filled
    />

    <v-btn
      block
      :loading="pending"
      type="submit"
      color="primary"
      class="auth-form__submit"
    >
      {{ $t('auth.register') }}
    </v-btn>
  </v-form>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import { Call } from 'vuex-pathify';

import { Dictionary, Pending } from '@/types';


import { required } from '@/utils/validators';

export interface ToggleTodoContract {
  type: 'Auth/getCurrentUser';
  payload: {
    todoId: number;
    completed: boolean;
  };
}


@Component({ inheritAttrs: false })
export default class SignUpForm extends Vue {
  showPassword: boolean = false;

  user: Dictionary<string> = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  rules: any = {
    required,
    isEqualPassword: (value: string) => value === this.user.password,
  };

  get pending () {
    return this.$store.state.Auth.pending.signUp;
  }

  get errors (): any {
    return this.$store.getters['Auth/getErrorsByKey']('signUp');
  }

  @Call('Auth/signUp') callAuthSignUp!: (payload: any) => Promise<any>;
  // @Call('Workspace/setCurrent') callWorkspaceSet!: (payload: any) => Promise<void>;

  async signUp () {
    // @ts-ignore
    const isValid = this.$refs.form.validate();
    const { user } = this;

    if (isValid) {
      const createdWorkspace = await this.callAuthSignUp(user);
      if (createdWorkspace) {
        // this.callWorkspaceSet(createdWorkspace);

        this.$router.push({
          name: 'Auth/login',
          query: {
            confirm: user.email,
          }
        });
      }
    }
  }
}

</script>
