<template>
  <layout-wrapper>
    <div class="w-full mx-1 my-2 p-2 border border-skwhite rounded-lg flex">
      <div><img src="~/static/img/simple-transparent.png" class="w-14"></div>
      <div class="flex flex-col w-full mr-2">
        <!-- name row -->
        <div class="flex mb-1 justify-between flex-col md:flex-row">
          <div class="flex">
            <p class="font-bold mr-2">
              largekirby
            </p>
            <a class="text-skwhite-dark mr-2" href="https://twitter.com/smallkirby_">
              @smallkirby_
            </a>
          </div>
          <div class="text-skwhite-dark">
            {{ timestampPretty }}
          </div>
        </div>

        <!-- text row -->
        <div>
          <p>{{ tweet.text }}</p>
        </div>

        <!-- icons row -->
        <div class="mt-1 flex w-full md:w-1/2 justify-between mx-auto">
          <a href="http://www.catb.org/~esr/faqs/hacker-howto.html" target="_blank">
            <img :src="current_fukidashi_image" class="w-6 fill-white" @mouseover="flip_fukidashi_mouseon" @mouseleave="flip_fukidashi_mouseon">
          </a>
          <a href="https://twitter.com/intent/tweet?text=DON%27T%20RETWEET%20PRIVATE%20ACOUNT%21%21%21DON%27T%20RETWEET%20PRIVATE%20ACOUNT%21%21%21DON%27T%20RETWEET%20PRIVATE%20ACOUNT%21%21%21DON%27T%20RETWEET%20PRIVATE%20ACOUNT%21%21%21" target="_blank">
            <img :src="current_retweet_image" class="w-6 fill-white" @mouseover="flip_retweet_mouseon" @mouseleave="flip_retweet_mouseon">
          </a>
          <a href="https://kaguya.love" target="_blank">
            <img :src="current_fav_image" class="w-6 fill-white" @mouseover="flip_fav_mouseon" @mouseleave="flip_fav_mouseon">
          </a>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { SotsuronTweet } from '~/typings/sotsuron';

export default Vue.extend({
  name: 'SotsuronTwitterBadge',
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      fav_image_mouseon: false,
      fukidashi_image_mouseon: false,
      retweet_image_mouseon: false,
    };
  },

  computed: {
    timestampPretty () {
      const tweet = this.tweet as SotsuronTweet;
      const time = moment.unix(tweet.timestamp);
      return time.format('YYYY/MM/DD HH:mm:ss');
    },

    // eslint-disable-next-line object-shorthand
    current_fav_image: function () {
      return (this.$data as any).fav_image_mouseon ? require('~/static/img/sotsuron/heart-br.png') : require('~/static/img/sotsuron/heart.png');
    },

    // eslint-disable-next-line object-shorthand
    current_fukidashi_image: function () {
      return (this.$data as any).fukidashi_image_mouseon ? require('~/static/img/sotsuron/fukidashi-zzz.png') : require('~/static/img/sotsuron/fukidashi.png');
    },

    // eslint-disable-next-line object-shorthand
    current_retweet_image: function () {
      return (this.$data as any).retweet_image_mouseon ? require('~/static/img/sotsuron/retweet-white.png') : require('~/static/img/sotsuron/retweet.png');
    },
  },

  methods: {
    flip_fav_mouseon () {
      (this as any).fav_image_mouseon = !(this as any).fav_image_mouseon;
    },
    flip_fukidashi_mouseon () {
      (this as any).fukidashi_image_mouseon = !(this as any).fukidashi_image_mouseon;
    },
    flip_retweet_mouseon () {
      (this as any).retweet_image_mouseon = !(this as any).retweet_image_mouseon;
    },
  },
});
</script>
