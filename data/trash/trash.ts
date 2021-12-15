import { Trash } from '@/types/trash/trash';
import { stripIndent } from 'common-tags';

export const trashes: Trash[] = [
  {
    title: 'kernelpwn',
    title_link: 'https://github.com/smallkirby/kernelpwn',
    image_path: '/img/trashes/kernelpwn.png',
    description: stripIndent`
      Collection of kernel pwn challenges and their writeups.
      All of them are solved by me and ranked into Good, Beginner, or Nirugiri.
      It also have some documents about important configurations, uesful techniques, and how to start kernel pwning.
    `,
  },
  {
    title: 'lysithea',
    title_link: 'https://github.com/smallkirby/lysithea',
    image_path: '/img/trashes/lysithea.png',
    description: stripIndent`
      lysithea is a set of small cute utilities for CTF kernel pwn challenges.
      It makes misc operations in pwn very easy.
      lysithea helps you write your exploits by logging all the output from QEMU. These output are logged with exploit code at that time. You no longer have to worry miss your exploit.
      You can check kernel exploitable configurations by lysithea.
      lysithea is born just because I wanted to write some Bash code at that time.
    `,
  },
];
