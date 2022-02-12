<template>
  <layout-wrapper>
    <div>
      <tmux-pane />
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Index',
  layout: 'tmux',

  mounted () {
    if (window.innerWidth >= 700) {
      this.$router.replace('/help');
    }
  },
});
</script>

<style>
</style>
