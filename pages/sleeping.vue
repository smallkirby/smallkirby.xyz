<template>
  <layout-wrapper>
    <layout-header title="sleeping" />
    <div>
      <div class="main-window">
        <div id="sleeping-header">
          <p style="font-weight:bold;">
            {{ title }}
          </p>
          <p>Visit <a href="https://sleeping.smallkirby.xyz">https://sleeping.smallkirby.xyz</a></p>
        </div>
        <div id="sleeping">
          <hooper
            :settings="hooperSettings"
          >
            <slide v-for="(ent, ix) of pairs" :key="ix">
              <div class="slide-content">
                <table class="sleeping-table">
                  <tr v-for="(pair, jx) of ent" :key="jx" class="sleeping-row">
                    <th class="sleeping-th">
                      <div>{{ pair[0] }}</div>
                    </th>
                    <td class="sleeping-td">
                      {{ pair[1] }}
                    </td>
                  </tr>
                </table>
              </div>
            </slide>

            <hooper-pagination slot="hooper-addons" />
            <hooper-navigation slot="hooper-addons" />
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

<style>

#sleeping {
  height: 80vh;
  width: 80vh;
  margin-left: auto;
  margin-right: auto;
}

.hooper {
  height: 80vh !important;
  width: 100vh !important;
}

.hooper-slide {
  margin: 1em auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  width: 50vh;
}

slide {
  text-align: center;
}

.slide-content {
  margin: 1em;
}

#sleeping-header {
  text-align: center;
  margin-top: 1em;
  width: 100vw;
}

a {
  color: #349E24;
}

.hooper-indicator.is-active {
  background-color: #ebdbb2 !important;
}

svg.icon.icon-arrowLeft {
  fill: #ebdbb2 !important;
}

svg.icon.icon-arrowRight {
  fill: #ebdbb2 !important;
}

table.sleeping-table {
  border: 1px solid #ebdbb2;
  width: 40vw;
}

.sleeping-th {
  border-right: 4px double #ebdbb2;
  width: 27%;
  text-align: right top;
  padding-right: 0.3em;
  font-weight: normal;
  height: auto;
}

.sleeping-td {
  text-align: left;
  padding-left: 0.5em;
  width: 75%;
  overflow-wrap: break-word;
  white-space: normal !important;
  height: auto;
}

</style>
