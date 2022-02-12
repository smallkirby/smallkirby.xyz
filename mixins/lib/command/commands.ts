import { LsEntry } from '~/typings/ls';
import { CommandResultCore } from '~/typings/command';

export interface AvailCommand {
  name: string,
  func: (args: string[], routeList: LsEntry[]) => CommandResultCore[],
};

export const execShmug = (_args: string[], _: LsEntry[]): CommandResultCore[] => {
  return [{
    ent: 'c|_]',
  }];
};

export const execLs = (_args: string[], routeList: LsEntry[]): CommandResultCore[] => {
  return routeList.map((e: LsEntry) => {
    return {
      ent: `rwxr-xr--  skb skb ${e.pagename}`,
      link: e.routename,
    };
  });
};

export const execCat = (args: string[], routeList: LsEntry[]): CommandResultCore[] => {
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

export const execCd = (_args: string[], _routeList: LsEntry[]): CommandResultCore[] => {
  return [{
    ent: 'Bloom where God has planted you...',
  }];
};

export const execHelp = (_args: string[], _routeList: LsEntry[]): CommandResultCore[] => {
  return [{
    ent: 'help',
  }];
};

export const availCommands: AvailCommand[] = [
  {
    name: 'shmug',
    func: execShmug,
  },
  {
    name: 'ls',
    func: execLs,
  },
  {
    name: 'cat',
    func: execCat,
  },
  {
    name: 'cd',
    func: execCd,
  },
  {
    name: 'help',
    func: execHelp,
  },
];
