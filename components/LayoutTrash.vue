<template>
  <layout-wraper>
    <div class="mx-2 md:mx-4 mb-20">
      <div>
        <a class="font-bold text-xl mt-2" :href="trash.title_link">
          {{ trash.title }}
        </a>
      </div>
      <div class="content-center mt-4 flex justify-center">
        <div class="w-1/2 mr-4">
          <img :src="trash.image_path" class="h-64 float-right">
        </div>
        <div class="w-1/2 text-left ml-4 mt-4">
          <div v-if="repo !== null">
            <p>star: {{ repo.stargazers_count }} </p>
            <p>watcher: {{ repo.subscribers_count }}</p>
            <p>forks: {{ repo.forks }} </p>
            <p>last update: {{ repo.updated_at }} </p>
          </div>
          <div v-else>
            <p>Repository information is not available</p>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <p>{{ trash.description }}</p>
      </div>
    </div>
  </layout-wraper>
</template>

<script lang="ts">
import { GithubMixin } from '@/mixins/GithubMixin';
import { RepositoryInfo, RepoBasicInfo } from '@/types/github/github';

export default GithubMixin.extend({
  name: 'LayoutTrash',
  props: {
    trash: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      repo: null as RepositoryInfo | null,
    };
  },
  async created () {
    const basicInfo: RepoBasicInfo | null = this.url2info(this.trash.title_link);
    if(basicInfo === null) { return; }
    const repo: RepositoryInfo | null = await this.getRepoInfo(basicInfo.owner, basicInfo.reponame);
    this.repo = repo;
  },
});
</script>

<style></style>
