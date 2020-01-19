<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="onSubmit"
    @reset.prevent="onReset"
  >
    <v-text-field
      v-model="form.email"
      label="E-mail"
      color="#6200ee"
      outlined
      readonly
      required
      append-icon="file_copy"
      @click:append="onCopy(form.email)"
    />

    <v-text-field
      v-model="form.firstName"
      :rules="nameRules"
      label="firstName"
      color="#6200ee"
      outlined
      required
    />

    <v-text-field
      v-model="form.lastName"
      :rules="nameRules"
      label="lastName"
      color="#6200ee"
      outlined
      required
    />

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      type="submit"
    >
      save
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      type="reset"
    >
      Reset Form
    </v-btn>
  </v-form>
</template>

<script lang="ts">

import { Vue, Component, Ref, Prop, Watch, Mixins } from 'vue-property-decorator';

import { Call } from 'vuex-pathify';
import { Scalars } from '@/types';
import { User } from '@/types/api';

import { NotifyMixin } from '@/mixins';


@Component({ inheritAttrs: false })
export default class AccountEditForm extends Mixins(NotifyMixin) {
  @Ref('form')
  $form!: HTMLFormElement

  public form: User = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
  }

  public valid: Scalars['Boolean'] = true

  public nameRules: Array<any> = [
    (v: Scalars['String']) => !!v || 'Required',
  ]

  public emailRules: Array<any> = [
    (v: Scalars['String']) => !!v || 'E-mail is required',
    (v: Scalars['String']) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]

  public get account () {
    return this.$store.state.Account.account;
  }

  @Watch('account', { immediate: true, deep: true })
  public onAccountChange (account: User) {
    this.form = Object.assign({}, account);
  }

  /**
   * name
   */
  @Call('Account/update')
  callAccountUpdate!: (payload: User) => Promise<Scalars['Boolean']>

  public async onSubmit () {
    if (this.$form.validate()) {
      console.log('onSubmit');
      // this.snackbar = true;
      const result = await this.callAccountUpdate(this.form);
    }
  }

  public async onReset () {
    this.$form.reset();
    await this.$nextTick();
    this.onAccountChange(this.account);
  }

  public async onCopy (value: Scalars['String']) {
    try {
      const result = await this.$copyText(value);
      this.$notify({
        type: 'info',
        translate: 'copied_to_clipboard',
      });
    } catch (error) {
      this.$notify({
        type: 'error',
        translate: 'not_copied_to_clipboard',
        timeout: 6000
      });
    }
  }
}

</script>
