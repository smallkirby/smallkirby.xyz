<template>
  <layout-wrapper>
    <layout-header title="sotsuron" />
    <div>
      <div class="main-window">
        <print-char-by
          :reqmsg="titleMsg"
          :interval="50"
          :finwait="50"
          @finish-print-char-by="finTitleMsg"
        />
      </div>
    </div>

    <div class="mx-5 mt-5">
      <div>
        <p>This page collects sotsuron progress status from smallkirby's secret account of Twitter(<a href="https://twitter.com/smallkirby_">@smallkirby_</a>).</p>
        <p>Please ping me if the progress seems really poor!!</p>
      </div>

      <div v-if="loading" class="mt-5 mb-2">
        <vue-loading type="spin" />
        <p class="text-center">
          loading information...
        </p>
      </div>
      <div v-else class="mt-5">
        <div>
          <input id="fitXaxis" type="checkbox" @click="redrawChart">
          <label for="fitXaxis">Fit x-axis scale</label>
        </div>
        <sotsuron-chart
          ref="sotsuron_chart"
          :sotsurons="sotsurons"
        />
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import { FirebaseMixin } from '~/mixins/FirebaseMixin';
import { SotsuronTweet } from '~/types/sotsuron';

export default FirebaseMixin.extend({
  name: 'sotsuron',
  data () {
    return {
      titleMsg:
        '$ watch -n $((60 * 60)) ./fetch_sotsuron_status.py',
      flagTitleMsg: false,
      sotsurons: [] as SotsuronTweet[],
      loading: false,
      fitXaxis: false,
    };
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
    },

    redrawChart (): void {
      this.$set(this, 'fitXaxis', !this.fitXaxis);
      const chart = this.$refs.sotsuron_chart;
      if (chart === undefined) { return; }
      // ts-ignore
      (chart as any).redrawChart(this.fitXaxis);
    },
  },

  async created () {
    if (process.client) {
      this.loading = true;
      const sotsurons: SotsuronTweet[] = await this.getSotsuronTweets();
      this.$data.sotsurons = sotsurons;
    } else {
      this.$data.sotsurons = [];
    }
    if (this.$data.sotsurons === undefined || this.$data.sotsurons.length === 0) {
      this.$data.loading = true;
    } else {
      this.$data.loading = false;
    }
  },
});
</script>
