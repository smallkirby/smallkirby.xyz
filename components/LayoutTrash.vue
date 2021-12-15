<template>
  <layout-wraper>
    <div class="mx-auto pb-4 mb-20 w-1/2 border-2 border-skblack-light rounded-lg">
      <div class="pt-4">
        <a class="font-bold text-3xl mt-2" :href="trash.title_link">
          {{ trash.title }}
        </a>
      </div>
      <div class="content-center mt-4 flex justify-center">
        <div class="w-1/2 mr-4">
          <img :src="trash.image_path" class="h-64 float-right">
        </div>
        <div class="w-1/2 text-left ml-4 mt-4">
          <div v-if="repo !== null" class="flex justify-start">
            <div class="mr-4">
              <p>star</p>
              <p>watcher</p>
              <p>forks</p>
              <p>commits</p>
              <p>last update</p>
            </div>
            <div>
              <p>: {{ repo.stargazers_count }} </p>
              <p>: {{ repo.subscribers_count }}</p>
              <p>: {{ repo.forks }}</p>
              <p>: {{ repo.total_commits }} </p>
              <p>: {{ date2str(repo.updated_at) }} </p>
            </div>
          </div>
          <div v-else>
            <p>Repository information is not available</p>
          </div>
        </div>
      </div>
      <div class="mt-5 text-center mx-auto w-5/6">
        <pre class="whitespace-pre-wrap">{{ trash.description }}</pre>
      </div>
    </div>
  </layout-wraper>
</template>

<script lang="ts">
import { GithubMixin } from '@/mixins/GithubMixin';
import { RepositoryInfo, RepoBasicInfo } from '@/types/github/github';
import moment from 'moment';

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

  methods: {
    date2str (date: Date) {
      return moment(date).format('YYYY.MM.DD HH:mm');
    },
  },
});
</script>

<style></style>
