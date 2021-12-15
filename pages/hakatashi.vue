<template>
  <layout-wrapper>
    <layout-header title="hakatashi" />
    <div>
      <div class="main-window">
        <layout-print-char-by :reqmsg="titleMsg" :interval="100" :finwait="50" @finish-print-char-by="finTitleMsg" />
        <div>
          <hakatashi-badge />
          <hakatashi-total-github />
          <hakatashi-todays-github />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Hakatashi',
  data () {
    return {
      titleMsg: '$ dig hakatashi',
      flagTitleMsg: false,
    };
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
    },
  },
});
</script>

<style></style>
