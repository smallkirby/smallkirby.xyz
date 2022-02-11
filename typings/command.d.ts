export interface CommandResultPrint {
  ent: string,
  link?: string,
}

export interface CommandResultRedirect {
  path: string,
}

export type CommandResultCore = CommandResultPrint | CommandResultRedirect;

export interface CommandResult {
  command: string;
  result: CommandResultCore[],
  is_imm: boolean;
}
