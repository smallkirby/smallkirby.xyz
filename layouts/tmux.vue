<template>
  <div>
    <layout-header :title="title" />
    <div class="w-full h-full flex flex-row">
      <div id="tmux-pane" class="border-r-1 border-white ">
        <tmux-pane />
      </div>
      <div id="body-wrapper">
        <router-view />
      </div>
      <layout-footer />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TmuxLayout',
  data () {
    return {
      title: 'bash',
    };
  },
  watch: {
    $route (to) {
      this.title = to.name !== null ? to.name : 'bash';
    },
  },
});
</script>

<style lang='scss'>
@import '~/static/css/default.scss';
</style>
