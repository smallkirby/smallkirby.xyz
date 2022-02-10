import Vue from 'vue';
import { SotsuronTweet } from '~/typings/sotsuron';
import { sotsuronTweets } from '~/data/sotsuron';

export const FirebaseMixin = Vue.extend({
  methods: {
    // fetch sotsuron tweets list.
    // the data is now static.
    async getSotsuronTweets (): Promise<SotsuronTweet[]> {
      return await Promise.resolve(sotsuronTweets);
    },
  },
});
