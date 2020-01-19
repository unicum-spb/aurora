<template>
  <div class="home">
    Главная страница
  </div>
</template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { Get } from 'vuex-pathify';


@Component({ inheritAttrs: false })
export default class Home extends Vue {}

</script>
