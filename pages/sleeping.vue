<template>
  <layout-wrapper>
    <layout-header title="sleeping" />
    <div>
      <div class="main-window">
        <div id="sleeping">
          <hooper
            :settings="hooperSettings"
          >
            <slide v-for="(ent, ix) of pairs" :key="ent">
              <div class="slide-content">
                <p v-for="(pair, jx) of ent" :key="pair">
                  {{pair[0]}}: {{pair[1]}}
                </p>
              </div>
            </slide>

            <hooper-pagination slot="hooper-addons"></hooper-pagination>
            <hooper-navigation slot="hooper-addons"></hooper-navigation>
          </hooper>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import { Hooper, Slide, Pagination as HooperPagination, Navigation as HooperNavigation } from 'hooper';
import axios from 'axios';
import 'hooper/dist/hooper.css';

export default Vue.extend({
  name: 'Sleeping',
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation,
  },
  data () {
    return {
      titleMsg: '$ cat ./sleeps.log',
      flagTitleMsg: false,
      pairs: [] as any,
      title: '',
      subtitle: '',
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true,
        infiniteScroll: true,
        autoPlay: true,
        playSpeed: 3000,
        progress: true,
      },
    };
  },
  async created () {
    const { data } = await axios.get('/api/sleeps');
    const wai = data;
    const headers: string[] = wai.headers;
    const entries: string[][] = wai.ents;
    this.title = wai.title;
    this.subtitle = wai.sheet_title;
    for (const ent of entries) {
      if (ent.length <= 2) {
        break;
      }
      this.pairs.push(ent.map((e, i: number) => [headers[i], e]));
    }
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
    },
  },
});
</script>

<style local>

/*
#sleeping {
  text-align: center;
  display: inline-block;
  margin: auto 2em;
  padding: auto 2em;
  align-items: center;
  justify-content: center;
}
*/

.hooper {
  height: 80vh;
}

.hooper-slide {
  margin: 2em auto;
  padding: 3em auto;
  align-items: center;
  justify-content: center;
  /*display: flex;*/
  text-align: center;
  vertical-align: middle;
  height: 1200px;
}

slide {
  text-align: center;
}

.slide-content {
  margin: 2em;
  height: 1200px;
}

</style>
