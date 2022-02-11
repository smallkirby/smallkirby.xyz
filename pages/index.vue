<template>
  <layout-wrapper>
    <div>
      redirecting...
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Index',
  layout: 'tmux',

  created () {
    this.$router.replace('/help');
  },
});
</script>

<style>
</style>
