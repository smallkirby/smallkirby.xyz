<template>
  <layout-wrapper>
    <div class="mx-auto pb-4 mb-20 w-full md:w-1/2 border-2 border-skblack-light rounded-lg">
      <div class="pt-4">
        <a class="font-bold text-3xl mt-2" :href="trash.title_link">
          {{ trash.title }}
        </a>
      </div>
      <div class="content-center mt-4 flex flex-col md:flex-row justify-center">
        <div class="w-full md:w-1/2 mr-4 pl-4">
          <img :src="trash.image_path" class="h-64 mx-auto md:float-right">
        </div>
        <div class="w-full md:w-1/2 text-left ml-4 mt-4 content-center">
          <div v-if="repo !== null" class="mx-auto">
            <table class="mx-auto md:float-left">
              <tr>
                <td>star</td>
                <td class="pl-4">
                  {{ repo.stargazers_count }}
                </td>
              </tr>
              <tr>
                <td>watcher</td>
                <td class="pl-4">
                  {{ repo.subscribers_count }}
                </td>
              </tr>
              <tr>
                <td>forks</td>
                <td class="pl-4">
                  {{ repo.forks }}
                </td>
              </tr>
              <tr>
                <td>commits</td>
                <td class="pl-4">
                  {{ repo.total_commits }}
                </td>
              </tr>
              <tr>
                <td>last update</td>
                <td class="pl-4">
                  {{ date2str(repo.updated_at) }}
                </td>
              </tr>
              <tr>
                <td>language</td>
                <td class="pl-4">
                  {{ langOccupationString }}
                </td>
              </tr>
            </table>
          </div>
          <div v-else>
            <p>Repository information is not available</p>
          </div>
        </div>
      </div>
      <div class="mt-5 pt-5 md:pt-0 text-center mx-auto w-5/6 border-t-2 md:border-t-0 border-skwhite-dark border-dotted">
        <pre class="whitespace-pre-wrap">{{ trash.description }}</pre>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import { GithubMixin } from '@/mixins/GithubMixin';
import moment from 'moment';
import { RepositoryInfo, RepoBasicInfo, LanguageOccupation } from '~/typings/github';

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
    if (basicInfo === null) { return; }
    const repo: RepositoryInfo | null = await this.getRepoInfo(basicInfo.owner, basicInfo.reponame);
    this.repo = repo;
  },

  methods: {
    date2str (date: Date) {
      return moment(date).format('YYYY.MM.DD HH:mm');
    },
  },

  computed: {
    languages () {
      if (this.repo === null) { return [] as LanguageOccupation[]; }
      // @ts-ignore
      return this.repo.languages.filter((lang: LanguageOccupation) => { return lang.ratio >= 0.1; });
    },

    langOccupationString () {
      const langs: LanguageOccupation[] = this.languages;
      return langs.map((l) => {
        const ratio = Math.ceil(l.ratio * 100);
        return `${l.lang} (${ratio}%)`;
      }).join(', ');
    },
  },
});
</script>

<style></style>
