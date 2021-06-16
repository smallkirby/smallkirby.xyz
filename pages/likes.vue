
<template>
  <layout-wrapper>
    <layout-header title="likes" />
    <div>
      <div class="main-window">
        <layout-print-char-by :reqmsg="titleMsg" :interval="50" :finwait="50" @finish-print-char-by="finTitleMsg" />
        <div class="center-normal">
          <layout-print-line-by v-if="flagTitleMsg" :reqmsg="mylikes" interval="100" @finish-print-line-by="finMyLikes" />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import { stripIndent } from 'common-tags'
import Vue from 'vue'

const _mylikes = stripIndent`
  犬
  スマブラ
`

export default Vue.extend({
  name: 'About',
  data () {
    return {
      titleMsg: '$ find $SMALLKIRBY -type f | xargs grep like | grep -v lazy',
      mylikes: _mylikes,
      flagTitleMsg: false,
    }
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true
    },
    finMyLikes (): void {
    },
  },
})
</script>

<style>
div.main-window {
  padding-top: 1.2em;
  padding-left: 0.3em;
}
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

</style>
