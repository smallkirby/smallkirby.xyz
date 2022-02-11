import Vue from 'vue';
import { CommandResultCore, CommandResult } from '~/typings/command';
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

const execLs = (_args: string[], routeList: LsEntry[]): CommandResultCore[] => {
  return routeList.map((e: LsEntry) => {
    return {
      ent: `rwxr-xr--  skb skb ${e.pagename}`,
      link: e.routename,
    };
  });
};

const execCat = (args: string[], routeList: LsEntry[]): CommandResultCore[] => {
  if (args.length !== 1) {
    return [{
      ent: 'usage: cat <file>',
    }];
  }

  const candidate = routeList.filter(e => e.pagename === args[0]);
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
      routeList: [] as LsEntry[],
    };
  },

  created () {
    this.$router.options.routes?.forEach((route) => {
      this.routeList.push({
        pagename: route.name ? route.name : 'unknown',
        routename: route.path,
      });
    });
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

      for (const result_ent of result) {
        if ('path' in result_ent) {
          this.$router.push(result_ent.path);
          break;
        }
      }
    },

    execCommand (command: string): CommandResultCore[] {
      const parts: string[] = command.split(' ').map(s => s.trim());
      const cmd = parts[0];
      const args = parts.slice(1);

      if (cmd === 'shmug') {
        return execShmug(args);
      } else if (cmd === 'ls') {
        return execLs(args, this.routeList);
      } else if (cmd === 'cd') {
        return execCd(args);
      } else if (cmd === 'cat') {
        return execCat(args, this.routeList);
      } else {
        return [{
          ent: `Command ${cmd} not found.`,
        }];
      }
    },
  },
});
