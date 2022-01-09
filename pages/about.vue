<template>
  <layout-wrapper>
    <layout-header title="about" />
    <div>
      <div class="main-window">
        <print-char-by :reqmsg="titleMsg" :interval="100" :finwait="50" @finish-print-char-by="finTitleMsg" />
        <div v-if="flagTitleMsg" class="center-normal">
          <img id="kirby-pict" src="/img/simple-transparent.png" width="300" height="300">
          <p>student of University of Tokyo</p>
          <p>major in electronics and photonics</p>
          <p>interested in <em>undefined</em></p>
          <br>
          <p>blog: <a href="https://smallkirby.hatenablog.com">newbie dive into binary</a></p>
          <p>github: <a href="https://github.com/smallkirby">smallkirby</a></p>
          <p>twitter: <a href="https://twitter.com/smallkirby">@smallkirby</a></p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'About',
  data () {
    return {
      titleMsg: '$ cat ./about.txt',
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
