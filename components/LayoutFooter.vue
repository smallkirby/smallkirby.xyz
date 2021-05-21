<template>
  <footer>
    <div id="footer-status">
      <div id="left-status"><p>NORMAL</p></div>
      <div id="branch"><p>master*</p></div>
      <div id="linenums"><p>0% 1/152 ln:1</p></div>
      <div id="encoding"><p>utf-8[unix] LF</p></div>
      <div></div>
    </div>
  </footer>
</template> 

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutFooter',
  data() {
    return {
    }
  },
});
</script>

<style scoped>
footer {
  text-align: center;
  position: fixed;
  width: 100%;
  background-color: #32302f;
  border-top: #22201f;
  color: #ebdbb2;
  height: 1.3em;
  z-index: 99;
  bottom: 0;
}

div#footer-status {
  border-top: solid 0.1em;
  border-top-color: #42403f;
}

div#left-status {
  width: 15%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 7em;
}

div#branch {
  width: 15%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 7em;
}

div#linenums{
  width: 11%;
  float: right;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 13em;
}

div#encoding{
  width: 11%;
  float: right;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 13em;
}

img {
  height: auto;
  width: auto;
  max-height: 100%;
}

</style>
