<template>
  <layout-wrapper>
    <layout-header title="shell" />
    <div>
      <div class="main-window">
        <div v-for="(h,index) in history" :key="index">
          <layout-shell-line @shell-line-submitted="processCommand" />
          <p v-for="(p,pindex) in h.result" :key="pindex">
            {{ p }}
          </p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
// @ts-ignore
import LayoutShellLine from '~/components/LayoutShellLine.vue'

const commandsBlacklist = [
  'rm',
  'reboot',
  'shutdown',
  'chroot',
  'mv',
  'vim',
  'exploit',
]

interface CommandResult{
  command: string,
  result: string[],
};

interface Entry{
  pagename: string,
  perms: string,
  url: string,
  user: string,
  group: string,
  modified: string,
};

export default Vue.extend({
  name: 'Shell',
  data () {
    return {
      titleMsg: '$ /bin/bash',
      history: [] as CommandResult[],
    }
  },
  created () {
    this.history.push({ command: '', result: [] })
  },
  methods: {
    async processCommand (command: string) {
      this.$set(this.history, this.history.length - 1, {
        command,
        result: await this.execCommand(command),
      })
      this.history.push({ command: '', result: [] })
    },
    async execCommand (command: string) {
      const cmds = command.split(' ')
      if (commandsBlacklist.includes(cmds[0])) {
        this.$router.push('/index')
        return
      }
      if (cmds[0] === 'shmug') {
        return ['c|_|']
      } else if (cmds[0] === 'ls') {
        const { data } = await axios.get('https://smallkirby.xyz/ls.json')
        const entries = data as Entry[]
        return entries.map(e =>
          `${e.perms} ${e.user} ${e.group} ${e.pagename}`,
        )
      } else if (cmds[0] === 'cd') {
        return ['Bloom where God has planted you...']
      } else {
        return [`${cmds[0]}: command not found`]
      }
    },
  },
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
