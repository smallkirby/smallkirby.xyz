<template>
  <layout-wrapper>
    <layout-header :title="title" />
    <div>
      <div class="main-window">
        <div>
          <layout-print-char-by :reqmsg="msg1" @finish-print-char-by="hoge" />
          <layout-print-char-by v-if="msg1Flag" :reqmsg="msg2" :interval="30" @finish-print-char-by="hoge2" />
          <layout-print-char-by v-if="msg2Flag" :reqmsg="msg3" :interval="30" @finish-print-char-by="hoge3" />
          <layout-print-char-by v-if="msg3Flag" :reqmsg="msg4" :interval="30" @finish-print-char-by="hoge4" />
          <layout-print-char-by v-if="msg4Flag" :reqmsg="msg5" :interval="30" @finish-print-char-by="hoge5" />
        </div>
        <div>
          <layout-print-char-by v-if="msg5Flag" :reqmsg="msg6" @finish-print-char-by="hoge6" />
          <layout-print-line-by-code v-if="msg6Flag" :reqmsg="challengeMsg" />
        </div>
        <layout-print-char-by v-if="msg7Flag" :reqmsg="msg7" :interval="30" @finish-print-char-by="hoge7" />
        <div />
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

const _challengeMsg = `
#define<stdio.h>
int main(int argc, char *argv){
  struct {
    char buf[0x30];
    unsigned int secret; 
  } a = {.buf={0}, .secret=0xdeadbeef};
  scanf("%s", a.buf);
  if(a.secret == "0x626b73")
    system("sos-kirby");
}
`

export default Vue.extend({
  name: 'Sos',
  data () {
    return {
      title: 'sos',
      msg1: '$ cat ./description.txt',
      msg2: 'You can contact me ONLY FOR EMERGENCY PURPOSE.',
      msg3: 'Enter proper exploit and press [SOS], which would invoke:',
      msg4: '   - waiwai',
      msg5: '   - fugafuga',
      msg6: '$ cat ./challenge.c',
      msg7: '$ ',
      challengeMsg: _challengeMsg,
      msg1Flag: false,
      msg2Flag: false,
      msg3Flag: false,
      msg4Flag: false,
      msg5Flag: false,
      msg6Flag: false,
      msg7Flag: false,
    }
  },
  created () {
  },
  methods: {
    hoge (): void {
      this.msg1Flag = true
    },
    hoge2 (): void {
      this.msg2Flag = true
    },
    hoge3 (): void {
      this.msg3Flag = true
    },
    hoge4 (): void {
      this.msg4Flag = true
    },
    hoge5 (): void {
      this.msg5Flag = true
    },
    hoge6 (): void {
      this.msg6Flag = true
    },
    hoge7 (): void {
      this.msg7Flag = true
    },
  },
})
</script>

<style>
body {
  font-family: "Ubuntu Mono", monospace;
  background-color: #32302f;
  color: #ebdbb2;
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
}

div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

</style>
