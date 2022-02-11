<template>
  <layout-wrapper>
    <div>
      <div class="main-window">
        <print-char-by :reqmsg="titleMsg" :interval="100" :finwait="50" @finish-print-char-by="finTitleMsg" />
        <div v-if="flagTitleMsg" class="center-normal">
          <div class="pb-20">
            <h1 class="text-2xl">
              Welcome to smallkirby's homepage.
            </h1>
          </div>

          <div>
            <p>
              If you are using a PC (not smartphones),
              <b class="text-skred">you can use Shell-like interface to browse this site.</b>
            </p>
            <p>
              Try typing <b>'cat about'</b> in the left pane.
            </p>
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Help',
  layout: 'tmux',
  data () {
    return {
      titleMsg: '$ ./smallkirby.xyz --help',
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
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

</style>
