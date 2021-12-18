<template>
  <layout-wrapper>
    <div class="mt-8 w-9/12 mx-auto flex flex-col border py-4 px-4 border-skwhite-dark">
      <div class="text-4xl text-skblue">
        <p>Github Overview</p>
      </div>
      <div v-if="allUsers" class="mt-4">
        <table class="ml-4">
          <tr>
            <td>Public Repos</td>
            <td class="pl-4">
              {{ hakatashi.public_repos }}
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        <p>No information available</p>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  name: 'HakatashiTotalGithub',

  computed: {
    ...mapGetters('github', [
      'allUsers',
    ]),

    hakatashi () {
      // @ts-ignore
      const cands = this.allUsers.filter((user) => { return user.name === 'hakatashi'; });
      if (cands.length !== 0) {
        return cands[0];
      } else {
        return null;
      }
    },
  },

  methods: {
    ...mapActions('github', [
      'fetchUser',
    ]),
  },
});
</script>

<style></style>
