<template>
  <div>
    <div class="ps1">
      <p>
        <span class="username">{{username}}@</span>
        <span class="hostname">{{hostname}}</span> 
        <span class="ps1-elem">:</span>
        <span class="cwd">{{cwd}}</span>  
        <span class="ps1-elem">:</span>
        <span class="curtime">{{curtime}}</span>  
        <br>
      </p>
    </div>

    <div class="prompt">
      <span class="dollar">$ </span> 
      <textarea v-if='!flagInputLocked' v-on:keyup.enter="submitInput" v-model.trim='userinput' class="shellinput" type="text" autofocus spellcheck="false" ref="userinput"></textarea>
      <p v-if='flagInputLocked'>{{userinput}}</p> 
    </div>  
  </div>  
</template>

<script lang='ts'>
import Vue from 'vue'
import moment from 'moment';

export default Vue.extend({
  name: 'LayoutShellLine',
  props: {
  },
  data () {
    return {
      username: 'ubuntu',
      hostname: 'smallkirbyxyz',
      cwd: '~',
      curtime: '',
      userinput: '',
      flagInputLocked: false,
    }
  },
  mounted (){
    this.curtime = moment().format('HH:mm:ss ddd MMM DD');
    //@ts-ignore
    this.$refs.userinput.focus();
  },
  methods: {
    submitInput(){
      this.flagInputLocked = true;
      this.$emit('shell-line-submitted', this.userinput);
    },
  },
})
</script>

<style scoped>
.ps1{
  margin-top: 0.3em;
}
.hostname {
  color: #9aab46;
  padding: 0;
  margin: 0;
  display: block;
  float: left;
  font-weight: bold;;
}
.username {
  color: #9aab46;
  padding: 0;
  margin: 0;
  display: block;
  float: left;
  font-weight: bold;;
}
.curtime{
  color: #48680e;
  display: block;
  float: left;
}
.cwd{
  color: #84a87f;
  display: block;
  float: left;
}
.ps1-elem{
  display: block;
  float: left;
  margin-left: 0.2em;
  margin-right: 0.2em;
}

.shellinput{
  width: 80%;
  height: 1.5em;
  background: transparent;
  border: none;
  overflow: hidden;
  resize: none;
}
textarea:focus{
  background: transparent;
  border: none;
  outline-width: 0;
}

div.prompt{
  margin-top: 0;
  padding-top: 0;
}

span.dollar{
  margin-top: 0em;
  padding-top: 0em;
  display: block;;
  float: left;
  margin-right: 0.5em;
}
</style>
