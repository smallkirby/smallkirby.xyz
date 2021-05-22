
<template>
  <layout-wrapper>
    <layout-header title="about" />
    <div>
      <div class="main-window">
        <p>{{titleMsg}}</p><br>
        <div class="center-normal">
          <img id="kirby-pict" src="/img/simple-transparent.png" width="500" height="500">
          <p>blog: <a href="https://smallkirby.hatenablog.com">newbieからバイナリアンへ</a></p>
          <p>github: <a href="https://github.com/smallkirby">smallkirby</a></p>
          <p>twitter: <a href="https://twitter.com/smallkirby_">@smallkirby_</a></p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'about',
  data() {
    return {
      titleMsg: "_",
    }
  },
  created() {
    this.printCharBy("titleMsg", "$ echo ./about");
  },
  methods: {
     printCharBy(data: string, msg: string): void {
       const subPrintCharBy = (curMsg: string) => {
         if(curMsg.length <= 0){
           return;
         }
         const current = this.$data[data];
         this.$data[data] = current.slice(0, current.length-1) + curMsg.slice(0,1)[0] + (curMsg.length == 1 ? "" : "_");
         setTimeout(() => subPrintCharBy(curMsg.slice(1)), 100);
       };
       subPrintCharBy(msg);
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
