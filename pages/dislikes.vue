<template>
  <layout-wrapper>
    <layout-header title="dislikes" />
    <div>
      <div class="main-window">
        <layout-print-char-by
          :reqmsg="titleMsg"
          :interval="50"
          :finwait="50"
          @finish-print-char-by="finTitleMsg"
        />
      </div>
      <div>
        <div v-for="(l, index) in dislikes" :key="index">
          <layout-like :like="l" />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { dislikes } from '@/data/dislikes/dislikes';

export default Vue.extend({
  name: 'Dislikes',
  data () {
    return {
      titleMsg:
        '$ getsebool -a | grep $SMALLKIRBY | pretty ',
      dislikes,
      flagTitleMsg: false,
    };
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
    },
    finMyLikes (): void {},
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
