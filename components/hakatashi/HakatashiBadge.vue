<template>
  <layout-wrapper>
    <div class="mt-8 w-1/2 mx-auto flex">
      <div class="">
        <img src="@/static/img/hakatashi.png" class="h-48">
        <div class="text-center mt-2">
          <p>Copyright <a href="https://github.com/hakatashi/icon">hakatashi</a></p>
          <a href="https://opensource.org/licenses/mit-license.php">MIT LICENSE</a>
        </div>
      </div>
      <div class="ml-8">
        <p class="text-xl">
          <a href="https://github.com/hakatashi">hakatashi</a>
        </p>
        <table class="ml-4">
          <tr>
            <td>Category</td>
            <td class="pl-4">
              : Human, City, Book
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td v-if="isSolid" class="pl-4 text-skwhite-light text-4xl">
              : SOLID!!!
            </td>
            <td v-else class="pl-4">
              : not solid
            </td>
          </tr>
        </table>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';
import { Octokit } from 'octokit';

export default Vue.extend({
  name: 'HakatashiBadge',

  data () {
    return {
      runs: [],
    };
  },

  computed: {
    isSolid () {
      // @ts-ignore
      for (const run of this.runs) {
        if (run.name !== undefined && run.name === 'Being a solid person') {
          return run.conclusion !== undefined && run.conclusion !== 'failure';
        }
      }

      return false;
    },
  },

  async created () {
    const octokit = new Octokit();
    const result = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', { owner: 'hakatashi', repo: 'hakatashi', branch: 'master', per_page: 2 });
    // @ts-ignore
    this.runs = result.data.workflow_runs;
  },
});
</script>

<style></style>
