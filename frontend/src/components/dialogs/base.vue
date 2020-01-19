<template>
  <v-dialog
    :value="localShow"
    v-bind="$props"
    v-on="$listeners"
    @click:outside="callCloseDialog"
  >
    <slot />
  </v-dialog>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import { Scalars } from '@/types';


@Component({ inheritAttrs: false })
export default class BaseDialog extends Vue {
  @Prop({ default: undefined })
  public activator!: any

  @Prop({ default: false })
  public attach!: any

  @Prop({ default: undefined })
  public contentClass!: any

  @Prop({ default: false })
  public dark!: Scalars['Boolean']

  @Prop({ default: false })
  public disabled!: Scalars['Boolean']

  @Prop({ default: false })
  public eager!: Scalars['Boolean']

  @Prop({ default: false })
  public fullscreen!: Scalars['Boolean']

  @Prop({ default: false })
  public hideOverlay!: Scalars['Boolean']

  @Prop({ default: false })
  public internalActivator!: Scalars['Boolean']

  @Prop({ default: false })
  public light!: Scalars['Boolean']

  @Prop({ default: 'none' })
  public maxWidth!: Scalars['String'] | Scalars['Number']

  @Prop({ default: false })
  public noClickAnimation!: Scalars['Boolean']

  @Prop({ default: false })
  public openOnHover!: Scalars['Boolean']

  // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
  @Prop({ default: 'center center' })
  public origin!: Scalars['String']

  @Prop({ default: undefined })
  public overlayColor!: Scalars['String']

  @Prop({ default: undefined })
  public overlayOpacity!: number | Scalars['String']

  @Prop({ default: false })
  public persistent!: Scalars['Boolean']

  @Prop({ default: true })
  public retainFocus!: Scalars['Boolean']

  @Prop({ default: false })
  public scrollable!: Scalars['Boolean']

  @Prop({ default: 'dialog-transition' })
  public transition!: Scalars['String'] | Scalars['Boolean']

  @Prop({ default: 'auto' })
  public width!: Scalars['String'] | Scalars['Number']

  public localShow: Scalars['Boolean'] = false

  /**
   * callCloseDialog
   */
  public callCloseDialog () {
    if (this.persistent) { return; }

    setTimeout(() => {
      this.localShow = false;
      this.$emit('close', false);
    }, 300);
  }

  async created () {
    await this.$nextTick();
    this.localShow = true;
  }
}

</script>
