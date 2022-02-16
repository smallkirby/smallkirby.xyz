import { Machine } from '~/typings/machine';

export const machines: Machine[] = [
  {
    nickname: 'Bel',
    type: 'custom',
    spec: {
      cpu: 'Core i9 12900 (Alder Lake)',
      ssd: 'CSSD-M2B1TPG3VNF 1TB',
      memory: 'BL2K16G32C16U4B 16GB x 2',
      cooler: 'AK620',
      motherboard: 'TUF GAMING B660-PLUS WIFI D4',
      case: '4000D airflow',
      power: 'G800 GOLD',
    },
    period: {
      from: 2022,
    },
  },

  {
    nickname: 'skbpc',
    type: 'bto',
    spec: {
      name: 'ThinkPad T490',
      cpu: 'Core i5-10210U (Ice Lake)',
      ssd: 'unknown 512GB',
      memory: 'unknown 32GB',
    },
    period: {
      from: 2020,
    },
  },

  {
    nickname: 'bold',
    type: 'bto',
    spec: {
      name: 'dynabook R634-K',
      cpu: ' Core i5 (unknown)',
      ssd: 'unknown(HDD) 128GB',
      memory: 'unknown 12GB',
    },
    period: {
      from: 2018,
      to: 2020,
    },
  },

  {
    nickname: 'bunchin',
    type: 'bto',
    spec: {
      name: 'Macbook Pro 13-inch,2017',
      cpu: 'Intel Core i5 (unknown)',
      ssd: 'unknown 250GB',
      memory: 'unknown 8GB',
    },
    period: {
      from: 2018,
    },
  },
];
