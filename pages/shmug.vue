<template>
  <layout-wrapper>
    <layout-header title="about" />
    <div>
      <div class="main-window">
        <p>c|_|</p>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'shmug',
  data() {
    return {
      titleMsg: "$ cat ./about.txt",
      flagTitleMsg: false,
    }
  },
  methods: {
    finTitleMsg(): void{
      this.flagTitleMsg = true;
    }
  },
})
</script>

<style>
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

</style>
