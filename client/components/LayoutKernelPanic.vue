<template>
  <div id="kernel-panic-sentences">
    <div class="title">
      <layout-print-char-by :reqmsg="titleMsg" :interval="150" :finwait="500" @finish-print-char-by="hoge" />
    </div>
    <div class="main-sentences">
      <layout-print-line-by v-if="flagDumpMsg1" ref="refDumpMsg1" :reqmsg="dumpMsg1" interval="50" @finish-print-line-by="hoge2" />
      <div v-if="flagDumpMsg2">
        <p>[   32.303200]  ? <a href="/">index</a></p>
        <p>[   32.303201]  ? <a href="/about">about</a></p>
        <p>[   32.303201]  ? <a href="/">shell</a></p>
        <p>[   32.303201]  ? <a href="/likes">likes</a></p>
        <p>[   32.303201]  ? <a href="/sos">sos</a></p>
        <p>[   32.303202]  ? <a href="https://github.com/smallkirby" target="_blank">github</a></p>
      </div>
      <layout-print-line-by v-if="flagDumpMsg2" ref="refDumpMsg2" :reqmsg="dumpMsg2" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { stripIndent } from 'common-tags'

const _dumpMsg1: string = stripIndent`
  [   32.299320] general protection fault: 0000 [#1]
  [   32.299676] CPU: 2 PID: 86 Comm: exploit Tainted: G           O      6.7.2 #3
  [   32.299681] Name: smallkirby.xyz
  [   32.299682] Status: found(smallkirby.xyz)
  [   32.299896] Hardware name: QEMU Standard PC (i440FX + PIIX, 1996), BIOS 1.13.0-1ubuntu3.9 11/09/2032
  [   32.300307] RIP: 0010:0xDEADBEEFCAFEBABE
  [   32.300528] Code: Bad RIP value.
  [   32.300629] RSP: 0018:ffffadedc0153df0 EFLAGS: 00000246
  [   32.300823] RAX: deadbeefcafebabe RBX: 0000000000000000 RCX: 0000000000001570
  [   32.300992] RDX: 000000000000156f RSI: ffffa0f3ceb5d3e8 RDI: 0000000000000000
  [   32.301155] RBP: ffffa0f3ceb5eb00 R08: 0000000000000000 R09: 0000000000000000
  [   32.301322] R10: ffffadedc0153ed8 R11: 0000000000000000 R12: ffffa0f3ceb5eb00
  [   32.301493] R13: ffffa0f3ceb5d3c0 R14: ffffa0f3ceb5d3e8 R15: ffffa0f3ceb5d400
  [   32.301695] FS:  00000000004077d8(0000) GS:ffffffff96238000(0000) knlGS:0000000000000000
  [   32.301897] CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
  [   32.302032] CR2: 0000000000405136 CR3: 000000000eb6c000 CR4: 00000000000006f0
  [   32.302267] Call Trace:
  [   32.302745]  ? seq_read+0xa4/0x3e0
  [   32.302850]  ? __vfs_read+0x22/0x150
  [   32.302939]  ? vfs_read+0x97/0x140
  [   32.303021]  ? ksys_read+0x3e/0xb0
  [   32.303103]  ? do_syscall_64+0x42/0x120
  [   32.303195]  ? entry_SYSCALL_64_after_hwframe+0x44/0xa9
`
const _dumpMsg2 = stripIndent`
  [   32.303371] Modules linked in: dockerd(O)
  [   32.304008] ---[ end trace 9699fdcf83e9fabe ]---
  [   32.304220] RIP: 0010:0xdeadbeefcafebabe
  [   32.304375] Code: Bad RIP value.
  [   32.304550] RSP: 0018:ffffadedc0153df0 EFLAGS: 00000246
  [   32.304726] RAX: deadbeefcafebabe RBX: 0000000000000000 RCX: 0000000000001570
  [   32.304902] RDX: 000000000000156f RSI: ffffa0f3ceb5d3e8 RDI: 0000000000000000
  [   32.305091] RBP: ffffa0f3ceb5eb00 R08: 0000000000000000 R09: 0000000000000000
  [   32.305263] R10: ffffadedc0153ed8 R11: 0000000000000000 R12: ffffa0f3ceb5eb00
  [   32.305444] R13: ffffa0f3ceb5d3c0 R14: ffffa0f3ceb5d3e8 R15: ffffa0f3ceb5d400
  [   32.305654] FS:  00000000004077d8(0000) GS:ffffffff96238000(0000) knlGS:0000000000000000
  [   32.305840] CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
  [   32.305978] CR2: 0000000000405136 CR3: 000000000eb6c000 CR4: 00000000000006f0
  [   32.306287] Kernel panic - not syncing: Fatal exception
  [   32.306503] Kernel Offset: 0x14000000 from 0xffffffff81000000 (relocation range: 0xffffffff80000000-0)
  [   32.306918] Rebooting in 1 seconds..
`

export default Vue.extend({
  name: 'LayoutKernelPanic',
  data () {
    return {
      commName: 'bash',
      titleMsg: 'MAYBE, YOU ATTEMPT EXPLOIT...?',
      dumpMsg1: _dumpMsg1,
      dumpMsg2: _dumpMsg2,
      flagDumpMsg1: false,
      flagDumpMsg2: false,
      cpuno: 0,
    }
  },
  created () {
    this.cpuno = Math.floor(Math.random() * 5)
  },
  methods: {
    hoge (): void {
      this.flagDumpMsg1 = true
    },
    hoge2 (): void {
      this.flagDumpMsg2 = true
      const elem = this.$el.querySelector('#kernel-panic-sentences')
      console.log(elem)
      if (elem === null) {
        return
      }
      elem.scrollTop = elem?.scrollHeight
    },
  },
})
</script>

<style lang='scss'>
@import '~/static/css/default.scss';
</style>
