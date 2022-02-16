export type MachineType = 'custom' | 'bto';

export type MachinePeriod = {
  from: number,
  to?: number,
};

export type MachineSpecCommon = {
  cpu: string,
  ssd: string,
  memory: string,
};

export type MachineSpecBto = {
  name: string,
} & MachineSpecCommon;

export type MachineSpecCustom = {
  cooler: string,
  motherboard: string,
  case: string,
  power: string,
  gpu?: string,
} & MachineSpecCommon;

export type Machine = {
  nickname: string,
  type: MachineType,
  spec: MachineSpecBto | MachineSpecCustom,
  period: MachinePeriod,
};
