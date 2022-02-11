<template>
  <layout-wrapper>
    <div>
      <div class="main-window">
        <print-char-by
          :reqmsg="titleMsg"
          :interval="50"
          :finwait="50"
          @finish-print-char-by="finTitleMsg"
        />
      </div>
      <div class="mt-8">
        <layout-bytes />
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Tools',
  layout: 'tmux',
  data () {
    return {
      titleMsg:
        '$ find ~/misc-tools/ -type f -name "*-tools.bash"',
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

<style>
div.main-window {
  padding-top: 1.2em;
  padding-left: 0.3em;
}
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}
</style>
