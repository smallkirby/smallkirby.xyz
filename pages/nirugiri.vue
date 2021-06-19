<template>
  <layout-wrapper>
    <layout-header title="nirugiri" />
    <div>
      <div class="main-window">
        <div id="nirugiri">
          <p>c|_|</p>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Nirugiri',
  data () {
    return {
      titleMsg: '$ cat ./about.txt',
      flagTitleMsg: false,
    }
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true
    },
  },
})
</script>

<style>
div.center-normal {
  text-align: center;
}

</style>
