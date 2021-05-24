<template>
  <pre><div class="code-wrapper"><code>{{ msg }}</code></div></pre>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutPrintLineByCode',
  props: {
    reqmsg: {
      type: String,
      default: ''
    },
    interval: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  async mounted () {
    await this.printLineBy('msg', this.reqmsg, this.interval)
    this.$emit('finish-print-line-by-code')
  },
  methods: {
    printLineBy (dataName: string, msg: string, interval = 100): Promise<void> {
      if (msg[0] === '\n') {
        msg = msg.slice(1)
      }
      if (msg[msg.length - 1] === '\n') {
        msg = msg.slice(0, msg.length - 1)
      }
      return new Promise((resolve, reject) => {
        const lines = msg.split('\n')
        const subPrintLineBy = (curix: number) => {
          if (curix >= lines.length) {
            resolve()
            return
          }
          this.$set(this.$data, dataName, this.$data[dataName] + lines[curix] + '\n')
          setTimeout(() => subPrintLineBy(curix + 1), interval)
        }
        subPrintLineBy(0)
      })
    }
  }
})
</script>

<style scoped>
pre{
  margin: 0em 0em;
  padding: 0em 0em;
  width: fit-content;
}
code {
  margin: 0em;
  padding: 0em auto;
  font-family: "Ubuntu Mono", monospace;
  font-size: 16px;
  display: inline-block;
}

div.code-wrapper {
  display: inline-block;
  margin: 0 auto;
  padding: 0.01em;
  padding-top: 0em;
  height: fit-content;
}
</style>
