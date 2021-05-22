<template>
  <footer>
    <div id="footer-status">
      <div id="left-status"><p>NORMAL</p></div>
      <div id="branch"><p>master*</p></div>
      <div id="rights"><p>smallkirby no rights received</p></div>
      <div id="linenums"><p>0% 1/152 ln:1</p></div>
      <div id="encoding"><p>utf-8[unix] LF</p></div>
      <div></div>
    </div>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-197610910-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-197610910-1');
    </script>

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
div#footer-status {
  border-top: solid 0.1em;
  border-top-color: #42403f;
  text-align: center;
  position: fixed;
  width: 100%;
  background-color: #32302f;
  color: #ebdbb2;
  height: 1.3em;
  z-index: 99;
  bottom: 0;
}

div#left-status {
  width: 15%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 7em;
  overflow: hidden;
}

div#branch {
  width: 15%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 7em;
  overflow: hidden;
}

div#rights {
  width: 48%;
  float: left;
  display: inline;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-align: center;
}

div#linenums{
  width: 11%;
  float: right;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 13em;
  overflow: hidden;
}

div#encoding{
  width: 11%;
  float: right;
  display: inline;
  padding: 0;
  margin: 0;
  max-width: 13em;
  overflow: hidden;
}

img {
  height: auto;
  width: auto;
  max-height: 100%;
}

</style>
