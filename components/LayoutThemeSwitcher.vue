<template>
  <div class="wrapper-wrapper-mode-switcher">
    <div v-if="isDarkMode" class="wrapper-mode-switcher">
      <div id="deep-shadow">
        <div id="deep-shadow-message">
          <p>Everything in deep dark...</p>
        </div>
      </div>
    </div>
    <div class="mode-switcher">
      <input id="mode-toggle" v-model="isDarkMode" class="toggle-input" type="checkbox" @change="changeMode">
      <label for="toggle" class="toggle-label" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutThemeSwitcher',
  data () {
    return {
      isDarkMode: false,
    }
  },
  methods: {
    changeMode () {
      if (this.isDarkMode) {
        console.log('everything is in the deep shadow now...')
      }
    },
  },
})
</script>

<style scoped lang='scss'>
.mode-switcher {
  display: block;
  z-index: 100;
  top: 4em;
  right: 7em;
  text-align: center;
  float: left;
}

.toggle-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}


.toggle-label {
  width: 40px;
  height: 12px;
  background: black;
  border: solid 1px;
  border-color: #ebdbb2;
  position: relative;
  display: inline-block;
  border-radius: 46px;
  transition: 0.4s;
  box-sizing: border-box;
  margin-top: 0.2em;
  &:after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    background: #ebdbb2;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.4s;
  }
}
.toggle-input:checked{
  +.toggle-label{
    background-color: #4bd865;
    &:after{
      left: 27px;
    }
  }
}

#deep-shadow{
  width: 100%;
  height: 100%;
  background-color: black;
  color: #151515;
  text-align: center;
  vertical-align: middle;
}

#deep-shadow-message{
  display: block;
  padding-top: 20%;
}

.wrapper-mode-switcher{
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 1.2em;
  position: absolute;
  z-index: 80;
}

@media only screen and (max-width: 699px) {
  .wrapper-wrapper-mode-switcher{
    display: none;
  }
}

</style>
