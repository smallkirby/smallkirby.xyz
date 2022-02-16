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
      <div>
        <div v-for="(machine, index) in machines" :key="index">
          <machine-entry :ent="machine" class="mb-4" />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { machines } from '~/data/machines';

export default Vue.extend({
  name: 'Machines',
  layout: 'tmux',
  data () {
    return {
      titleMsg:
        '$ find /home/smallkirby/machines | history',
      flagTitleMsg: false,
      machines,
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
