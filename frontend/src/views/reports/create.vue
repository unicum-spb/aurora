<template>
  <div class="reports-add-view">
    <Upload-Report-Form />
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

import UploadReportForm from '@/components/forms/UploadReport.vue';


@Component({
  inheritAttrs: false,
  components: {
    UploadReportForm
  }
})
export default class ReportsAddView extends Vue {

}

</script>
