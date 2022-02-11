<template>
  <layout-wrapper>
    <div>
      <div class="main-window">
        <div id="shmug">
          <p>c|_|</p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Shmug',
  layout: 'tmux',
  data () {
    return {
      titleMsg: '$ cat ./about.txt',
      flagTitleMsg: false,
    };
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
    },
  },
});
</script>

<style>
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

div#shmug {
  height: 100%;
  width: 100%;
  text-align: center;
}

div#shmug > p {
  font-size: 20em;
}

</style>
