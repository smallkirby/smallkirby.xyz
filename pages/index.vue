<template>
  <layout-wrapper>
    <layout-header title="panic" />

    <div>
      <div class="main-window">
        <layout-kernel-panic />
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import { stripIndent } from 'common-tags'
import LayoutPrintCharBy from '~/components/LayoutPrintCharBy.vue'
import LayoutPrintLineBy from '~/components/LayoutPrintLineBy.vue'
import LayoutFooter from '~/components/LayoutFooter.vue'
import LayoutKernelPanic from '~/components/LayoutKernelPanic.vue'

export default Vue.extend({
  name: 'Index',
  components: { LayoutPrintCharBy, LayoutPrintLineBy, LayoutFooter, LayoutKernelPanic },
  data () {
    return {
      commName: 'bash',
    }
  },
  methods: {
  },
})
</script>

<style lang='scss'>
@import '~/static/css/default.scss';
</style>
