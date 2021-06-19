<script lang="ts">
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  name: 'LayoutLineChar',
  mixins: [Line, reactiveProp],
  props: ['options'],
  mounted () {
    // @ts-ignore
    this.renderChart(this.data, this.options);
  },
};
</script>

<style>
div.center-normal {
  text-align: center;
}

</style>