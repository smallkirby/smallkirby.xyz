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
        <p>NOTE: Data collection is stopped at 2022.02.09, and now it is static.</p>
      </div>

      <div v-if="loading" class="mt-5 mb-2">
        <vue-loading type="spin" />
        <p class="text-center">
          loading information...
        </p>
      </div>
      <!-- Sotsuron Chart -->
      <div v-else>
        <div class="mt-5">
          <sotsuron-chart
            ref="sotsuron_chart"
            :sotsurons="sotsurons"
          />
        </div>

        <!-- Sotsuron Timeline -->
        <div class="md:w-1/2 mx-auto mt-8 flex flex-col justify-center mb-3">
          <div class="content-center mx-auto my-2">
            <p class="font-bold text-4xl">
              Timeline
            </p>
          </div>
          <div v-for="(tweet, ix) in sotsurons" :key="ix">
            <sotsuron-twitter-badge :tweet="tweet" />
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import SotsuronTwitterBadge from '~/components/SotsuronTwitterBadge.vue';
import { FirebaseMixin } from '~/mixins/FirebaseMixin';
import { SotsuronTweet } from '~/typings/sotsuron';

export default FirebaseMixin.extend({
  components: { SotsuronTwitterBadge },
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
      const sotsurons_sorted = sotsurons.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
      this.$data.sotsurons = sotsurons_sorted;
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
