<template>
  <layout-wrapper>
    <layout-header title="likes" />
    <div>
      <div class="main-window">
        <print-char-by
          :reqmsg="titleMsg"
          :interval="50"
          :finwait="50"
          @finish-print-char-by="finTitleMsg"
        />
      </div>
      <div>
        <div v-for="(l, index) in mylikes" :key="index">
          <like-paragraph :like="l" />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { likes } from '@/data/likes/likes';

export default Vue.extend({
  name: 'About',
  data () {
    return {
      titleMsg:
        '$ find /home/smallkirby/likes/ -type f | xargs grep like | grep -v lazy',
      mylikes: likes,
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
