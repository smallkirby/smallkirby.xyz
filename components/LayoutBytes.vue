<template>
  <layout-wrapper>
    <div class="mx-2 md:mx-4 mb-2">
      <h2 class="text-xl font-bold">
        Byte and Hex
      </h2>
    </div>
    <div class="flex ml-8">
      <input v-model="bytestring" class="bg-skblack-dark" @keyup.enter="convert2hex">
      <div class="flex flex-col mx-5">
        <button @click="convert2hex">
          to hex →
        </button>
        <button @click="convert2bytes">
          ← to bytes
        </button>
      </div>
      <input v-model="hexstring" class="bg-skblack-dark" @keyup.enter="convert2bytes">
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

const PAGE_SHIFT = 10; // PAGE???????
const UNITS: {
  name: string
  ch: string
  shift: number
}[] = [
  {
    name: 'Byte',
    ch: 'B',
    shift: 0,
  },
  {
    name: 'Kilo Byte',
    ch: 'K',
    shift: 10,
  },
  {
    name: 'Mega Byte',
    ch: 'M',
    shift: 20,
  },
  {
    name: 'Giga Byte',
    ch: 'G',
    shift: 30,
  },
  {
    name: 'Tera Byte',
    ch: 'T',
    shift: 40,
  },
  {
    name: 'Peta Byte',
    ch: 'P',
    shift: 50,
  },
  {
    name: 'Exa Byte',
    ch: 'E',
    shift: 60,
  },
  {
    name: 'Zetta Byte',
    ch: 'Z',
    shift: 70,
  },
  {
    name: 'Yotta Byte',
    ch: 'Y',
    shift: 80,
  },
];

export default Vue.extend({
  name: 'LayoutBytes',
  data () {
    return {
      bytestring: '',
      hexstring: '',
    };
  },
  methods: {
    convert2hex () {
      const bs = this.bytestring.trim();
      if (!bs) { return; }
      let pos_end_num = -1;
      let unitc = '';
      for (let ix = 0; ix !== bs.length; ++ix) {
        const c = bs.charAt(ix);
        if (isNaN(parseInt(c))) {
          if (bs.charAt(ix) !== ' ') {
            unitc = bs.charAt(ix);
            pos_end_num = ix - 1;
          } else if (bs.charAt(ix) === ' ' && bs.length > ix + 1) {
            unitc = bs.charAt(ix + 1);
            pos_end_num = ix;
          }
          break;
        }
      }

      if (!unitc || !(pos_end_num >= 0 && pos_end_num < bs.length)) {
        return;
      }
      const num = parseInt(bs.slice(0, pos_end_num + 1), 10);
      if (isNaN(num)) { return; }
      const unit = UNITS.find(u => u.ch === unitc);
      if (!unit) { return; }

      const hex = num << unit.shift;
      this.hexstring = `0x${hex.toString(16)}`;
    },
    convert2bytes () {
      let bs: string = this.hexstring.trim();
      if (!bs) { return; }
      bs = bs.startsWith('0x') ? bs.slice(2) : bs;
      const num = parseInt(bs, 16);
      if (isNaN(num)) { return; }

      let current = num;
      let shift_num = 0;
      while (((current >> PAGE_SHIFT) << PAGE_SHIFT) === current) {
        current = current >> PAGE_SHIFT;
        shift_num++;
      }

      const unit = UNITS[shift_num];
      if (!unit) { return; }
      this.bytestring = `${current} ${unit.ch}`;
    },
  },
});
</script>

<style></style>
