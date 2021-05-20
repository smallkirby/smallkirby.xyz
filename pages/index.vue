<template>
  <layout-wrapper>
    <layout-header title="index"/>
    <div>
      <div class="main-window">
        <div class="title"><print-char-by-layout :reqmsg="titleMsg" @finish-print-char-by="hoge"/></div>
        <div class="main-sentences">
          <div>
            <p v-for="(p,index) in dumpMsg1" :key=index>
              <span v-for="(c,index2) in p" :key=index2>{{c}}</span>
            </p>
          </div>
          <p>[   32.303200]  ? <a href ="/">index</a><br></p>
          <p>[   32.303201]  ? <a href="/about">about</a><br></p>
          <p>[   32.303201]  ? <a href="/likes">likes</a><br></p>
          <p>[   32.303202]  ? <a href="https://github.com/smallkirby" target="_blank">github</a><br></p>
          <p>[   32.303371] Modules linked in: dockerd(O)<br></p>
          <p>[   32.304008] ---[ end trace 9699fdcf83e9fabe ]---<br></p>
          <p>[   32.304220] RIP: 0010:0xdeadbeefcafebabe<br></p>
          <p>[   32.304375] Code: Bad RIP value.<br></p>
          <p>[   32.304550] RSP: 0018:ffffadedc0153df0 EFLAGS: 00000246<br></p>
          <p>[   32.304726] RAX: deadbeefcafebabe RBX: 0000000000000000 RCX: 0000000000001570<br></p>
          <p>[   32.304902] RDX: 000000000000156f RSI: ffffa0f3ceb5d3e8 RDI: 0000000000000000<br></p>
          <p>[   32.305091] RBP: ffffa0f3ceb5eb00 R08: 0000000000000000 R09: 0000000000000000<br></p>
          <p>[   32.305263] R10: ffffadedc0153ed8 R11: 0000000000000000 R12: ffffa0f3ceb5eb00<br></p>
          <p>[   32.305444] R13: ffffa0f3ceb5d3c0 R14: ffffa0f3ceb5d3e8 R15: ffffa0f3ceb5d400<br></p>
          <p>[   32.305654] FS:  00000000004077d8(0000) GS:ffffffff96238000(0000) knlGS:0000000000000000<br></p>
          <p>[   32.305840] CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033<br></p>
          <p>[   32.305978] CR2: 0000000000405136 CR3: 000000000eb6c000 CR4: 00000000000006f0<br></p>
          <p>[   32.306287] Kernel panic - not syncing: Fatal exception<br></p>
          <p>[   32.306503] Kernel Offset: 0x14000000 from 0xffffffff81000000 (relocation range: 0xffffffff80000000-0)<br></p>
          <p>[   32.306918] Rebooting in 1 seconds..<br></p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>
<script lang="ts">
import Vue from 'vue';
import {stripIndent} from 'common-tags';
import PrintCharByLayout from '~/components/PrintCharByLayout.vue';

const _dumpMsg1: string = stripIndent`
          [   32.299320] general protection fault: 0000 [#1]
          [   32.299676] CPU: {{cpuno}} PID: 86 Comm: exploit Tainted: G           O      6.7.2 #3
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
`;

export default Vue.extend({
  name: 'index',
  data() {
    return {
      commName: "bash",
      titleMsg: "MAYBE, YOU ATTEMPT EXPLOIT...?",
      dumpMsg1: [] as string[], 
      cpuno: 0,
    }
  },
  async created() {
    this.cpuno = Math.floor(Math.random() * 5);
  },
  methods: {
     hoge(): void {
        console.log("OKKKKKKKKKKKk");
        this.printLineCharBy("dumpMsg1", _dumpMsg1, 0.1);
     },
     printLineCharBy(dataname: string, msg: string, interval=1): Promise<void> {
       return new Promise((resolve, reject) => {
          const subPrintCharBy = (curMsg: string) => {
            if(curMsg.length <= 0){
              resolve();
              return;
            }
            if(curMsg.charAt(0) === '\n'){
              this.$data[dataname].push('_');
            }
            const nextIsNewline = (curMsg.length === 1) || (curMsg.length > 1 && curMsg.charAt(1) == "\n") ? true : false;
            const curix = this.$data[dataname].length - 1;
            const current = this.$data[dataname][curix];
            this.$set(this.$data[dataname], curix, current.slice(0, current.length-1) + curMsg.slice(0,1)[0] + (nextIsNewline ? "" : "_"));
            setTimeout(() => subPrintCharBy(curMsg.slice(1)), interval);
          };
          this.$data[dataname].push("_");
          subPrintCharBy(msg);
       });
     },
  },
})
</script>

<style>
body {
  font-family: "Ubuntu Mono", monospace;
  background-color: #32302f;
  color: #ebdbb2;
  white-space: nowrap;
}

div.main-window {
  padding-top: 1.2em;
  padding-left: 0.3em;
}

a {
  text-decoration: none;
  color: inherit;
}

div.title {
  margin: 0.1em;
}

div.title > p{
  size: 2000%;
}

div.main-sentences {
  line-height: 1.2em;
  margin-bottom: 0.5em;
}

</style>
