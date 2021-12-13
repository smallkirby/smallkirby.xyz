<template>
  <layout-wrapper>
    <layout-header title="Trash" />
    <div>
      <div class="main-window">
        <layout-print-char-by :reqmsg="titleMsg" :interval="100" :finwait="50" @finish-print-char-by="finTitleMsg" />
        <div v-if="flagTitleMsg" class="center-normal">
          <div v-for="(trash, index) in myTrashes" :key="index">
            <layout-trash :trash="trash" />
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { trashes } from '@/data/trash/trash';

export default Vue.extend({
  name: 'Trash',
  data () {
    return {
      titleMsg: '$ ls ~/.local/share/Trash/*',
      flagTitleMsg: false,
      myTrashes: trashes,
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
