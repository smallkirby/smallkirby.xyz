<template>
  <layout-wrapper>
    <layout-header title="shell" />
    <div>
      <div class="main-window">
        <layout-shell-line />
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutShellLine from '~/components/LayoutShellLine.vue'

export default Vue.extend({
  name: 'shell',
  data () {
    return {
      titleMsg: '$ /bin/bash',
    }
  },
  methods: {
  }
})
</script>

<style>
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

</style>
