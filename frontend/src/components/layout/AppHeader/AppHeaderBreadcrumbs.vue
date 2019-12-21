<template>
  <div class="breadcrumbs">
    <v-fade-transition mode="out-in">
      <!-- <v-progress-circular
        v-if="pendingGet"
        indeterminate
        class="breadcrumbs-menu__progress"
      /> -->

      <!-- <div
        v-else
        class="breadcrumbs-block"
      >
        <div class="breadcrumbs-block__sections">
          <v-fade-transition mode="out-in">
            <span v-if="organization.name.length">{{ organization.name }}</span>
            <span v-else>Личный аккаунт</span>
          </v-fade-transition>
          <v-icon size="18px">
            chevron_right
          </v-icon>
          <span>{{ Workspace.name || 'NONAME' }}</span>
        </div>

        <div class="breadcrumbs-block__menu">
          <v-btn
            v-for="{ name, title } in breadcrumbs"
            :key="name"
            :to="{ name }"
            :ripple="false"
            text
          >
            {{ title || $t(transformRouteName(name)) }}
          </v-btn>
        </div>
      </div> -->
    </v-fade-transition>
  </div>
</template>

<script lang="ts">


import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';

import { isNonEmptyArray } from '@/utils/helpers';


@Component({ inheritAttrs: false })
export default class AppHeaderBreadcrumbs extends Vue {
  @Prop({ required: true, default: () => ([]) }) readonly breadcrumbs!: Array<any>;

  // organization: Organization = {
  //   id: '',
  //   name: '',
  // };

  // @Get('Workspace/current') Workspace!: Partial<Workspace>;
  // @Get('Workspace/personal') personal!: Array<Partial<Workspace>>;
  // @Get('Workspace/organizations') organizations!: Array<Organization>;

  // @Get('Workspace.pending.getAll') pending!: boolean;
  // @Get('Workspace.pending.getById') pendingGet!: boolean;

  // @Watch('pending', { immediate: true })
  // onPendingChange (val: boolean) {
  //   if (!val) {
  //     // eslint-disable-next-line no-shadow
  //     const { organizations, Workspace } = this;

  //     const result = organizations
  //       .find(({ workspaces }) => {
  //         if (workspaces && isNonEmptyArray(workspaces)) {
  //           return workspaces.some(workspace => (workspace ? workspace.id === Workspace.id : false));
  //         }
  //         return false;
  //       });

  //     if (result) this.organization = result;
  //   }
  // }

  transformRouteName (name: string) {
    const result = 'breadcrumbs';
    if (!name) return `${result}.empty`;
    return `${result}.${name.toLowerCase()}`;
  }
}

</script>

<style lang="scss">


.breadcrumbs {
  &__back-button {
    width: 42px !important;
    height: 100% !important;
    margin: 0 !important;
  }
  > .v-toolbar {
    &__content {
      padding-left: 0;
      *:first-child.v-btn--icon {
        width: 30px;
        height: 30px;
        margin: 6px;
        &::before {
          background-color: transparent;
        }
      }
    }
  }
}

.breadcrumbs-block {
  padding-left: 24px;

  &__sections {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    font-size: 12px;
    line-height: 1;
    .v-icon {
      margin: 0 4px;
    }
  }
  &__menu {
    line-height: 21px !important;
    .v-btn {
      $offset-right: 4px;
      min-width: initial !important;
      height: 16px !important;
      margin: 0 $offset-right 0 0;
      padding: 0 !important;
      font-size: 16px;
      font-weight: normal;
      text-transform: initial;
      transition:
        margin-right 0s;

      &::before {
        background-color: transparent;
      }

      &::after {
        content: '/';
        margin-left: $offset-right;
      }

      &:last-child {
        margin-right: 0;
        &::after {
          display: none;
        }
      }

      &__content {
        line-height: 16px;
      }
    }
  }
}
.breadcrumbs-menu {
  &__progress {
    min-width: 200px;
    margin: 6px 0;
  }
  .v-list {
    padding-bottom: 12px;
    .v-subheader:nth-child(2n) {
      margin-top: 12px;
    }
    .v-subheader {
      height: 40px;
      padding: 0 24px;
      font-size: 12px;
    }
    &__tile {
      height: 40px;
      padding: 0 24px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.87);
      cursor: pointer;
      &:hover {
        background-color: #f1f3f4;
      }
    }
  }
}

</style>
