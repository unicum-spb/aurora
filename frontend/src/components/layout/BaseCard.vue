<template>
  <v-card
    v-bind="$attrs"
    :class="computedCardClassList"
    v-on="$listeners"
  >
    <v-toolbar
      v-if="slots['toolbar'] || slots['toolbar-title'] || backTo"
      flat
      class="base-card__toolbar"
      :height="toolbarHeight"
    >
      <template v-if="backTo">
        <v-btn
          :to="backTo"
          icon
        >
          <v-icon>{{ backIcon }}</v-icon>
        </v-btn>
        <v-divider vertical />
      </template>

      <v-toolbar-title v-if="slots['toolbar-title']">
        <slot name="toolbar-title" />
      </v-toolbar-title>

      <slot
        v-if="slots.toolbar"
        name="toolbar"
      />

      <template v-if="slots['toolbar-append']">
        <v-spacer />
        <slot name="toolbar-append" />
      </template>
    </v-toolbar>

    <slot name="default" />
  </v-card>
</template>

<script lang="ts">

import { Location } from 'vue-router/types';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class BaseCard extends Vue {
  @Prop({ default: 'chevron_left' }) backIcon!: string;
  @Prop({ default: false }) column!: boolean;
  @Prop({ default: false }) border!: boolean;
  @Prop({ default: false }) toolbarBorder!: boolean;
  @Prop({ default: null }) backTo!: Location;
  @Prop({ default: 64 }) toolbarHeight!: number;

  get computedCardClassList (): Array<any> {
    const { $vnode, $attrs, backTo, column, border, toolbarBorder } = this;

    const staticClassList = [];

    if ($vnode && $vnode.data && $vnode.data.staticClass) {
      const staticClass = $vnode.data.staticClass.split(' ');
      staticClassList.push(...staticClass);
    }

    return [
      'base-card',
      {
        _column: column,
        '_back-to': backTo,
        _border: border,
        '_toolbar-border': toolbarBorder,
      },
      ...staticClassList,
    ];
  }

  get slots () {
    return this.$scopedSlots;
  }
}

</script>

<style lang="scss">

$border-color: #dadcdf;
$background: #f1f3f4;

.base-card {
  overflow: hidden;
  border: none;

  .v-toolbar {
    border-bottom: none;
  }

  &._column {
    display: flex;
    flex-direction: column;

    .base-card__toolbar {
      flex: 0;
    }
    .v-window {
      flex: 1 1 auto;
      &__container {
        height: 100%;
      }
      .v-window-item {
        height: 100%;
      }
    }
  }

  &._border {
    border: solid 1px currentColor !important;
  }

  &._toolbar-border {
    .base-card__toolbar {
      &.theme--light {
        background-color: #fff;
        border-bottom: solid 1px $border-color;
      }
      &.theme--dark {
        border-bottom: solid 1px rgba(255,255,255,0.12);
      }
    }

    .v-toolbar__content > .v-tabs,
    .v-toolbar__extension > .v-tabs {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    .v-tabs-bar {
      max-height: 49px;
    }
  }

  &._back-to {
    .v-toolbar {
      &__title {
        span {
          margin-left: 2px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.54);
        }
      }
      &__extension,
      &__content {
        padding-top: 0;
        padding-bottom: 0;
        .v-btn::before {
          content: initial;
        }
        > *:first-child.v-btn--icon {
          margin-left: -16px;
          + .v-toolbar__title {
            padding-left: 8px !important;
            font-size: 1.15rem;
          }
        }
      }
    }
  }

  &__toolbar {
    &.theme--light {
      background-color: #fff;
    }
    .v-toolbar {
      &__title {
        // font-weight: normal;
      }
    }
  }

  .undertab-scrollable-container {
    overflow-y: auto;
    max-height: calc( 100vh - 115px );
  }

  .v-tabs {
    &__container {
      height: 64px;
    }
    .v-tab {
      padding: 0 28px;
      text-transform: uppercase;
    }
  }
}

</style>
