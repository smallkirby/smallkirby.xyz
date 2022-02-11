import Vue from 'vue';
import axios from 'axios';
import { Command, CommandType } from '~/typings/command';

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

export const TmuxMixin = Vue.extend({
  data () {
    return {
      history: [] as Command[],
    };
  },

  methods: {
    async processCommand(command: string) {
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
    async execCommand(command: string) {
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
