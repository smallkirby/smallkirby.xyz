<template>
  <header class="text-xl md:text-base">
    <div id="session-id">
      <p>
        Session: 38 <span style="color:#ffff00;">1</span>
        <span style="#248a9e">1</span>
      </p>
    </div>
    <div id="com">
      <p>1:{{ title }}*</p>
    </div>
    <div id="wrapper-theme-switcher" class="invisible md:visible">
      <theme-switcher />
      <p>Dark-theme</p>
    </div>
    <div id="time-status" class="invisible md:visible">
      <p>{{ timeStatus }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

export default Vue.extend({
  name: 'LayoutHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      timeStatus: '',
      commName: 'bash',
    };
  },
  created () {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  },
  methods: {
    updateTime (): void {
      this.timeStatus = moment().format('YYYY-MM-DD(ddd) HH:mm');
    },
  },
});
</script>

<style scoped>
header {
  background-color: #2e3436;
  padding-left: 0.2em;
  height: 1.2em;
  width: 100%;
  position: fixed;
  display: block;
  z-index: 90;
}

header > div {
  font-family: "Ubuntu Mono", monospace;
  padding: 0px;
  margin: 0 auto;
}

header > div#session-id {
  color: #349e24;
  text-align: left;
  display: inline;
  float: left;
  width: 33%;
}

header > div#wrapper-theme-switcher {
  display: inline;
  float: left;
  width: 18%;
}

header > div#com {
  color: #ebdbb2;
  text-align: center;
  display: inline;
  float: left;
  width: 33%;
}
header > div#time-status {
  color: #248a9e;
  text-align: right;
  display: inline;
  float: left;
  width: 15%;
}

@media only screen and (max-width: 699px) {
  header {
    font-size: 0.7em;
  }
  div#session-id {
    width: 20%;
    overflow: none;
  }
  div#comm {
    width: 50%;
    overflow: none;
  }
  div#time-status {
    width: 30%;
    overflow: none;
  }
}

div#wrapper-theme-switcher > p {
  margin-left: 3.5em;
  font-size: 0.8em;
}
</style>
