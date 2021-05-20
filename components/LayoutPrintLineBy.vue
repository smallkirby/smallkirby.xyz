<template>
  <div>
    <p v-for="(p,index) in msg" :key=index>
      <span v-for="(c,index2) in p" :key=index2>{{c}}</span>
    </p>
  </div>
</template> 

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutPrintLineBy',
  props: {
    reqmsg: {
      type: String,
      default: "",
    },
    interval: {
      type: Number,
      default: 100, 
    }
  },
  data() {
    return {
      msg: [] as string[],
    }
  },
  async mounted() {
    await this.printLineBy("msg", this.reqmsg, this.interval);
    this.$emit('finish-print-line-by');
  },
  methods: {
     printLineBy(data: string, msg: string, interval=100): Promise<void> {
       return new Promise((resolve, reject) => {
         const lines = msg.split('\n');
          const subPrintLineBy = (curix: number) => {
            if(curix >= lines.length){
              resolve();
              return;
            }
            this.$data[data].push(lines[curix]);
            setTimeout(() => subPrintLineBy(curix+1), interval);
          };
          subPrintLineBy(0);
       })
     },
  },
});
</script>