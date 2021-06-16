<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutPrintCharBy',
  props: {
    reqmsg: {
      type: String,
      default: '',
    },
    interval: {
      type: Number,
      default: 100,
    },
    finwait: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      msg: '_',
    }
  },
  async mounted () {
    await this.printCharBy('msg', this.reqmsg, this.interval, this.finwait)
    this.$emit('finish-print-char-by')
  },
  methods: {
    printCharBy (data: string, msg: string, interval = 100, finwait = 1): Promise<void> {
      return new Promise((resolve) => {
        const subPrintCharBy = (curMsg: string) => {
          if (curMsg.length <= 0) {
            setTimeout(() => resolve(), finwait)
            return
          }
          const current = this.$data[data]
          this.$set(this.$data, data, current.slice(0, current.length - 1) + curMsg.slice(0, 1)[0] + (curMsg.length === 1 ? '' : '_'))
          setTimeout(() => subPrintCharBy(curMsg.slice(1)), interval)
        }
        subPrintCharBy(msg)
      })
    },
  },
})
</script>
