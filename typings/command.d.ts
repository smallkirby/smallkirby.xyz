export type CommandType = 'print' | 'redirect' | 'invalid';

export type Command = {
  name: string,
  type: CommandType,
};
