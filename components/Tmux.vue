<template>
  <layout-wrapper>
    <div class="main-window">
      <div v-for="(h, index) in history" :key="index">
        <shell-line
          v-if="h.is_imm"
          :imm_command="h.command"
          @shell-line-submitted="processCommand"
        />
        <shell-line v-else @shell-line-submitted="processCommand" />
        <div v-for="(result, pindex) in h.result" :key="pindex">
          <div v-if="result.link">
            <p>
              <router-link :to="result.link">
                {{ result.ent }}
              </router-link>
            </p>
          </div>
          <div v-else>
            <p>{{ result.ent }}</p>
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import { TmuxMixin } from '~/mixins/TmuxMixin';

export default TmuxMixin.extend({
  name: 'Tmux',
  data () {
    return {
    };
  },
  mounted () {
    this.history.push({ command: 'ls', result: [], is_imm: true });
  },
});
</script>

<style>
</style>
