<template>
  <v-snackbar
    v-bind="attrs"
    @input="onClose"
  >
    {{ item.translate ? $t(item.translate) : item.message }}
    <v-btn
      dark
      text
      icon
      small
      @click="onClose"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

import { Dictionary } from '@/types';
import { Notification } from '@/types/notify.d';


@Component({ inheritAttrs: false })
export default class AppNotificationItem extends Vue {
  @Prop({ required: true })
  public item!: Notification;

  @Prop({ default: 0 })
  public index!: number;

  public calculatedStyle: Dictionary<any> = {};

  get attrs (): Dictionary<any> {
    const { id, type, timeout, positionX, positionY } = this.item;
    return {
      value: id,
      color: type,
      timeout,
      absolute: true,
      [positionY]: true,
      [positionX]: positionX !== 'center',
      style: this.calculatedStyle,
      class: ['notification-item']
    };
  }

  watcher: Function = function watcher () {};

  mounted () {
    this.watcher = this.$watch(
      'index',
      this.calcStyle,
      { immediate: true }
    );
  }

  calcStyle (index: number): void {
    const { item: { positionX, positionY } } = this;
    this.calculatedStyle = {
      [positionY]: `${index * this.$el.clientHeight}px`,
      [positionX]: 0
    };
  }

  onClose (): void {
    const {
      resolve,
      ...notification
    } = this.item;

    if (resolve) resolve(notification);
    this.$emit('close');
  }
}

</script>

<style lang="scss">

.notification-item {
  padding: 8px 12px;

  &.v-snack {
    right: initial;
    left: initial;

    &__wrapper {
      border-radius: 4px;
    }

    &__content {
      // padding: 14px 14px 14px 24px;
    }
  }

  @media only screen and (min-width: 600px) {
    &.v-snack--left.v-snack--top,
    .v-snack--right.v-snack--top {
      transform: none;
    }
  }
}

</style>
