<template>
  <layout-wrapper>
    <layout-header title="bash" />
    <div>
      <div class="main-window">
        <div v-for="(h, index) in history" :key="index">
          <shell-line
            v-if="h.is_imm"
            :imm_command="h.command"
            @shell-line-submitted="processCommand"
          />
          <shell-line v-else @shell-line-submitted="processCommand" />
          <div v-for="(result, pindex) in h.result" :key="pindex">
            <div v-if="result.link">
              <p><a :href="result.link">{{ result.ent }}</a></p>
            </div>
            <div v-else>
              <p>{{ result.ent }}</p>
            </div>
          </div>
        </div>
        <!--
        <kernel-panic v-if="flagPanicing" />
        -->
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
// @ts-ignore

const commandsBlacklist = [
  'rm',
  'reboot',
  'shutdown',
  'chroot',
  'mv',
  'vim',
  'exploit',
];

interface CommandResult {
  command: string;
  result: {
    ent: string,
    link?: string,
  }[];
  is_imm: boolean;
}

interface Entry {
  pagename: string;
  perms: string;
  url: string;
  user: string;
  group: string;
  modified: string;
}

export default Vue.extend({
  name: 'Shell',
  data () {
    return {
      titleMsg: '$ /bin/bash',
      history: [] as CommandResult[],
      flagPanicing: false,
    };
  },
  mounted () {
    this.history.push({ command: 'ls', result: [], is_imm: true });
  },
  methods: {
    async processCommand (command: string) {
      const result = await this.execCommand(command);
      this.$set(this.history, this.history.length - 1, {
        command,
        result,
        is_imm: this.history[this.history.length - 1].is_imm,
      });
      if (!this.flagPanicing) {
        this.history.push({ command: '', result: [], is_imm: false });
      }
    },
    async execCommand (command: string) {
      const cmds = command.split(' ');
      if (commandsBlacklist.includes(cmds[0])) {
        // this.$router.push('/index')
        this.flagPanicing = true;
        return;
      }
      if (cmds[0] === 'shmug') {
        return [{ ent: 'c|_|' }];
      } else if (cmds[0] === 'ls') {
        const { data } = await axios.get('/ls.json');
        const entries = data as Entry[];
        return entries.map(
          (e) => {
            return {
              ent: `${e.perms} ${e.user} ${e.group} ${e.pagename}`,
              link: e.pagename,
            };
          },
        );
      } else if (cmds[0] === 'cd') {
        return [{ ent: 'Bloom where God has planted you...' }];
      } else if (cmds[0] === 'cat') {
        if (cmds.length !== 2) {
          return [{ ent: 'usage: cat <file>' }];
        }
        const { data } = await axios.get('/ls.json');
        const entries = data as Entry[];
        const candidate = entries.filter(e => e.pagename === cmds[1]);
        if (candidate.length >= 1) {
          window.open(
            this.$router.resolve('/' + candidate[0].pagename).href,
            '_blank',
          );
          return [{ ent: '' }];
        } else {
          return [{ ent: `ls: cannot access '${cmds[1]}': No such file or directory` }];
        }
      } else {
        return [{ ent: `${cmds[0]}: command not found` }];
      }
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
