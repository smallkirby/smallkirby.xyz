import Vue from 'vue';
import { CommandResultCore, CommandResult } from '~/typings/command';
import { files } from '~/data/ls';
import { LsEntry } from '~/typings/ls';

const commandsBlacklist = [
  'rm',
  'reboot',
  'shutdown',
  'chroot',
  'mv',
  'vim',
  'exploit',
];

const execShmug = (_args: string[]): CommandResultCore[] => {
  return [{
    ent: 'c|_]',
  }];
};

const execLs = (_args: string[]): CommandResultCore[] => {
  return files.map((e: LsEntry) => {
    return {
      ent: `r--r-xrwx  skb skb ${e.pagename}`,
      link: e.routename,
    };
  });
};

const execCat = (args: string[]): CommandResultCore[] => {
  if (args.length !== 1) {
    return [{
      ent: 'usage: cat <file>',
    }];
  }

  const candidate = files.filter(e => e.pagename === args[0]);
  if (candidate.length >= 1) {
    return [{
      path: candidate[0].routename,
    }];
  } else {
    return [{
      ent: `ls: cannot access ${args[0]} : No such file or directory.`,
    }];
  }
};

const execCd = (_args: string[]): CommandResultCore[] => {
  return [{
    ent: 'Bloom where God has planted you...',
  }];
};

export const TmuxMixin = Vue.extend({
  data () {
    return {
      history: [] as CommandResult[],
      flagPanicing: false,
    };
  },

  methods: {
    processCommand (command: string) {
      const result = this.execCommand(command);
      this.$set(this.history, this.history.length - 1, {
        command,
        result,
        is_imm: this.history[this.history.length - 1].is_imm,
      });
      if (!this.flagPanicing) {
        this.history.push({ command: '', result: [], is_imm: false });
      }
    },

    execCommand (command: string) {
      const parts: string[] = command.split(' ').map(s => s.trim());
      const cmd = parts[0];
      const args = parts.slice(1);

      if (commandsBlacklist.includes(cmd)) {
        this.flagPanicing = true;
        return;
      }

      if (cmd === 'shmug') {
        return execShmug(args);
      } else if (cmd === 'ls') {
        return execLs(args);
      } else if (cmd === 'cd') {
        return execCd(args);
      } else if (cmd === 'cat') {
        return execCat(args);
      }
    },
  },
});
