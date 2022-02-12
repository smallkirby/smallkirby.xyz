import Vue from 'vue';
import { availCommands } from './lib/command/commands';
import { CommandResultCore, CommandResult } from '~/typings/command';
import { LsEntry } from '~/typings/ls';

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

      const cand = availCommands.filter(ent => ent.name === cmd);
      if (cand.length === 1) {
        return cand[0].func(args, this.routeList);
      } else {
        return [{
          ent: `Command ${cmd} not found.`,
        }];
      }
    },
  },
});
