<template>
  <layout-wrapper>
    <layout-header title="nirugiri" />
    <div>
      <div class="main-window">
        <div id="nirugiri">
          <layout-line-chart 
            :chart-data="datacollection" 
            :height="chart_height"
            :width="chart_width"
            :options="options"
            :styles="{'display':'flex', 'justify-content':'center'}"
          />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import { range } from 'lodash';

export default Vue.extend({
  name: 'Nirugiri',
  data () {
    return {
      titleMsg: '$ cat ./about.txt',
      flagTitleMsg: false,
      datacollection: null,
      options: null,
      chart_height: 200,
      chart_width: 350,
    }
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true
    },
  },
  async created() {
    const { data } = await axios.get('/nirugiri.json');
    const counts: number[] = data.counts;
    const labels = range(0, counts.length).map(n => n.toString());

    this.datacollection = {
      labels: labels,
      datasets: [{
        label: "Total",
        data: counts,
        borderColor: "#ebdbb2",
        pointBackgroundColor: "ebdbb2",
      }],
    };

    this.options = {
      responsive: true,
      title: {
        display: true,
        position: 'top',
        fontSize: 15,
        fontColor: "#ebdbb2",
        text: 'Nirugiri Counter',
      },
      legend: {
        display: true,
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: '???',
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'counts',
            beginAtZero: false,
          },
        }],
      },
    };
  }
})
</script>

<style>
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

div#nirugiri {
  width: 80vw;
  height: 80vh;
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
}

canvas {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
}

</style>
