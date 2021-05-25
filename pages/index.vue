<template>
  <layout-wrapper>
    <layout-header title="bash" />
    <div>
      <div class="main-window">
        <div v-for="(h,index) in history" :key="index">
          <layout-shell-line @shell-line-submitted="processCommand" />
          <p v-for="(p,pindex) in h.result" :key="pindex">
            {{ p }}
          </p>
        </div>
        <layout-kernel-panic v-if="flagPanicing" />
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
      flagPanicing: false,
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
      if (!this.flagPanicing) {
        this.history.push({ command: '', result: [] })
      }
    },
    async execCommand (command: string) {
      const cmds = command.split(' ')
      if (commandsBlacklist.includes(cmds[0])) {
        // this.$router.push('/index')
        this.flagPanicing = true
        return
      }
      if (cmds[0] === 'shmug') {
        return ['c|_|']
      } else if (cmds[0] === 'ls') {
        const { data } = await axios.get('/ls.json')
        const entries = data as Entry[]
        return entries.map(e =>
          `${e.perms} ${e.user} ${e.group} ${e.pagename}`,
        )
      } else if (cmds[0] === 'cd') {
        return ['Bloom where God has planted you...']
      } else if (cmds[0] === 'cat') {
        if (cmds.length !== 2) {
          return ['usage: cat <file>']
        }
        const { data } = await axios.get('/ls.json')
        const entries = data as Entry[]
        const candidate = entries.filter(e => e.pagename === cmds[1])
        if (candidate.length >= 1) {
          window.open(this.$router.resolve('/' + candidate[0].pagename).href, '_blank')
          return ['']
        } else {
          return [`ls: cannot access '${cmds[1]}': No such file or directory`]
        }
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
