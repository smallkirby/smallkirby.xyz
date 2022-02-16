<template>
  <layout-wrapper>
    <div class="mx-2 md:mx-4 mb-8 pl-2">
      <div>
        <p class="font-bold text-2xl mt-2 text-skgreen">
          {{ machine.nickname }}
        </p>
      </div>

      <!-- -->

      <table class="ml-8">
        <tbody class="text-left">
          <tr>
            <th class="pr-4 text-skgreen-light">
              type
            </th>
            <td>{{ machineType }}</td>
          </tr>
          <tr>
            <th class="pr-4 text-skgreen-light">
              used
            </th>
            <td>{{ usedPeriod }}</td>
          </tr>
          <tr v-if="machine.type === 'bto'">
            <th class="pr-4 text-skgreen-light">
              name
            </th>
            <td>{{ machine.spec.name }}</td>
          </tr>

          <!-- common specs -->
          <tr>
            <th class="pr-4 text-skgreen-light">
              CPU
            </th>
            <td>{{ machine.spec.cpu }}</td>
          </tr>
          <tr>
            <th class="pr-4 text-skgreen-light">
              storage
            </th>
            <td>{{ machine.spec.ssd }}</td>
          </tr>
          <tr>
            <th class="pr-4 text-skgreen-light">
              memory
            </th>
            <td>{{ machine.spec.memory }}</td>
          </tr>

          <!-- custom specs -->
          <tr v-if="machine.type === 'custom'">
            <th class="pr-4 text-skgreen-light">
              cooler
            </th>
            <td>{{ machine.spec.cooler }}</td>
          </tr>
          <tr v-if="machine.type === 'custom'">
            <th class="pr-4 text-skgreen-light">
              M/B
            </th>
            <td>{{ machine.spec.motherboard }}</td>
          </tr>
          <tr v-if="machine.type === 'custom'">
            <th class="pr-4 text-skgreen-light">
              case
            </th>
            <td>{{ machine.spec.case }}</td>
          </tr>
          <tr v-if="machine.type === 'custom'">
            <th class="pr-4 text-skgreen-light">
              power
            </th>
            <td>{{ machine.spec.power }}</td>
          </tr>
          <tr v-if="machine.type === 'custom'">
            <th class="pr-4 text-skgreen-light">
              GPU
            </th>
            <td>{{ machineGpu }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { Machine } from '~/typings/machine';

export default Vue.extend({
  name: 'MachineEntry',
  props: {
    ent: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      machine: this.ent as Machine,
    };
  },
  computed: {
    machineType () {
      // @ts-ignore
      if (this.machine.type === 'bto') {
        return 'BTO';
      // @ts-ignore
      } else if (this.machine.type === 'custom') {
        return 'Custom';
      } else {
        return 'Unknown';
      }
    },

    usedPeriod () {
      // @ts-ignore
      let text = this.machine.period.from;
      // @ts-ignore
      if (!this.machine.period.to) {
        text += ' ~ present';
      } else {
      // @ts-ignore
        text += ' ~ ' + this.machine.period.to;
      }
      return text;
    },

    machineGpu () {
      // @ts-ignore
      if (!this.machine.spec.gpu) {
        return '(built-in)';
      } else {
      // @ts-ignore
        return this.machine.spec.gpu;
      }
    },
  },
  methods: {},
});
</script>

<style></style>
