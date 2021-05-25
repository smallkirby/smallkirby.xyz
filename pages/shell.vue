<template>
  <layout-wrapper>
    <layout-header title="shell" />
    <div>
      <div class="main-window">
        <div v-for="(h,index) in history" :key="index">
          <layout-shell-line @shell-line-submitted="processCommand"/>
          <p>{{h.result}}</p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import LayoutShellLine from '~/components/LayoutShellLine.vue'

interface CommandResult{
  command: string,
  result: string,
};

export default Vue.extend({
  name: 'shell',
  data () {
    return {
      titleMsg: '$ /bin/bash',
      history: [] as CommandResult[],
    }
  },
  created() {
    this.history.push({command:'', result:''});
  },
  methods: {
    processCommand(command: string) {
      this.$set(this.history, this.history.length-1, {
        command: command,
        result: this.execCommand(command),
      });
      this.history.push({command: '', result: ''});
    },
    execCommand(command: string): string{
      const cmds = command.split(' ');
      if(cmds[0] === 'shmug'){
        return 'c|_|';
      }else{
        return `${cmds[0]}: command not found`;
      }
    },
  }
})
</script>

<style>
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

</style>
