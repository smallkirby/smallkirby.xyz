<template>
  <layout-wrapper>
    <canvas ref="sotsuronChartCanvas" :height="height" />
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart, { ChartItem } from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';
import { SotsuronTweet } from '~/types/sotsuron';

const pointColor = 'rgb(255, 0, 0)';
const defaultColor = 'rgb(251, 235, 194)';
const defaultFontFamily = 'Ubuntu Mono';
const defaultFont = {
  color: defaultColor,
  font: {
    family: defaultFontFamily,
    size: 23,
  },
};

const x_scale = {
  type: 'time',
  time: {
    unit: 'hour',
    displayFormats: {
      day: 'YYYY/MM/DD',
      hour: 'MM/DD HH:mm',
    },
  },
  ticks: {
    color: defaultColor,
    font: {
      family: defaultFontFamily,
    },
    maxTicksLimit: 15,
  },
  title: {
    text: 'date',
    display: true,
    ...defaultFont,
  },
  max: moment('2022-02-09T23:59:00').format(),
};
const y_scale = {
  ticks: {
    color: defaultColor,
    font: {
      family: 'Ubuntu Mono',
    },
  },
  title: {
    text: 'done pages',
    display: true,
    ...defaultFont,
  },
  suggestedMin: 0,
  suggestedMax: 30,
};

const scales = {
  x: x_scale,
  y: y_scale,
};

export default Vue.extend({
  name: 'SotsuronChart',

  props: {
    sotsurons: {
      type: Array,
      default: () => [],
      required: true,
    },

    height: {
      type: Number,
      default: 500,
    },
  },

  data () {
    return {
      chart: null,
      datasets: [
        {
          borderColor: defaultColor,
          fill: true,
          pointBackgroundColor: pointColor,
          pointBorderColor: pointColor,
          pointRadius: 5,
          data: [],
        },
      ],
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label (context: any) {
                return context.raw.text;
              },
            },
            displayColors: false,
          },
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        scales,
        maintainAspectRatio: false,
        responsive: true,
      },
    };
  },

  computed: {
    // eslint-disable-next-line object-shorthand
    chartData: function () {
      const sotsurons: SotsuronTweet[] = this.sotsurons as SotsuronTweet[];
      return sotsurons.map((sotsuron) => {
        return {
          x: moment.unix(sotsuron.timestamp).format(),
          y: sotsuron.done_pages,
          text: sotsuron.text,
        };
      });
    },
  },

  mounted () {
    this.$data.datasets[0].data = this.chartData;
    this.renderChart();
  },

  methods: {
    renderChart () {
      const canvas = this.$refs.sotsuronChartCanvas;
      if (canvas === undefined) { return; }
      this.$data.chart = new Chart(canvas as ChartItem, {
        type: 'line',
        data: {
          datasets: this.$data.datasets,
        },
        options: this.$data.options,
      });
    },

    maxX (fixXaxis: boolean) {
      if (fixXaxis) {
        return undefined;
      } else {
        return moment('2022-02-09T23:59:00').format();
      }
    },

    redrawChart (fitXaxis: boolean) {
      this.$data.chart.destroy();
      this.$data.options.scales.x.max = this.maxX(fitXaxis);
      this.renderChart();
    },
  },
});
</script>
