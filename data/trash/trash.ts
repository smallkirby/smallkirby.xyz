import { Trash } from '@/types/trash/trash';
import { stripIndent } from 'common-tags';

export const trashes: Trash[] = [
  {
    title: 'xtop',
    title_link: 'https://github.com/smallkirby/xtop',
    image_path: '/img/trashes/xtop.png',
    description: stripIndent`
      xtop is a top-like process monitor tool.
      xtop visualises not only process lists, but also CPU usage, disk I/O, network I/O, memory usage, docker usage, IO peripherals, and dmesg.
      It makes use of ncurses library to make information more graphical.
      In xtop, you can customize which and where gadget is placed.
      xtop is born because I wanted to write Rust at that time.
    `,
  },
  {
    title: 'skbctf-tsg',
    title_link: 'https://github.com/smallkirby/skbctf',
    image_path: '/img/trashes/skbctf.png',
    description: stripIndent`
      skbctf-tsg is a CTF platform for TSG.
      This is a expertimental site and intended only for insiders, but everyone can enjoy it.
      Public version of skbctf would be released in someday. though I don't know when. It would be kernelpwn only CTF platform.
    `,
  },
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
  {
    title: 'Rusty Cowsay',
    title_link: 'https://github.com/smallkirby/RustyCowsay',
    image_path: '/img/trashes/rustycowsay.png',
    description: stripIndent`
      RustyCowsay is a cowsay written in Rust (original one is written in perl).
      RustyCowsay is my first Rust code if my memory is correct. It is born just because I wanted to write Rust.
    `,
  },
  {
    title: 'smallkirby.xyz',
    title_link: 'https://github.com/smallkirby/smallkirby.xyz',
    image_path: '/img/trashes/smallkirby.xyz.png',
    description: stripIndent`
      This web site.
      As you can see from its PRs in Github, this is a kind of smallkirby-guesser.
      PR is always welcome, try guessing what I like.
    `,
  },
];
