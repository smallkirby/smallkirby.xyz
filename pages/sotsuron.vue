<template>
  <layout-wrapper>
    <layout-header title="sotsuron" />
    <div>
      <div class="main-window">
        <layout-print-char-by
          :reqmsg="titleMsg"
          :interval="50"
          :finwait="50"
          @finish-print-char-by="finTitleMsg"
        />
      </div>
    </div>

    <div class="md:mx-5 md:mt-5">
      <div>
        <p>This page collects sotsuron progress status from smallkirby's secret account of Twitter(<a href="https://twitter.com/smallkirby_">@smallkirby_</a>).</p>
        <p>Please ping me if the progress seems really poor!!</p>
      </div>

      <client-only>
        <div v-if="loading" class="mt-5 mb-2">
          <vue-loading type="spin" />
          <p class="text-center">
            loading information...
          </p>
        </div>
        <div v-else class="mt-5">
          <layout-sotsuron-chart
            :sotsurons="sotsurons"
          />
        </div>
      </client-only>
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
    };
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
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
