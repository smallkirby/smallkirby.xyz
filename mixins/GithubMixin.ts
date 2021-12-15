import Vue from 'vue';
import { RepoBasicInfo, RepositoryInfo } from '@/types/github/github';
import { Octokit } from 'octokit';

export const GithubMixin = Vue.extend({
  methods: {
    url2info (url: string): RepoBasicInfo | null {
      const re = /https:\/\/github\.com\/([a-zA-Z0-9]*)\/([a-zA-Z0-9/-/.]*).*/;
      const found = url.match(re);
      if (!found || found.length !== 3) { return null; } else {
        return {
          owner: found[1],
          reponame: found[2],
        };
      }
    },

    async getRepoInfo (owner: string, repo: string): Promise<RepositoryInfo | null> {
      const octokit = new Octokit();
      const repoResult = await octokit.request('GET /repos/{owner}/{repo}', { owner, repo })
        .catch(() => Promise.resolve(null));
      const contributorsResult = await octokit.request('GET /repos/{owner}/{repo}/contributors', { owner, repo })
        .catch(() => Promise.resolve(null));
      if (repoResult === undefined || repoResult === null || contributorsResult === undefined || contributorsResult == null) { return null; }

      const repoData = repoResult.data;
      const contData = contributorsResult.data;
      const total_commits = contData.reduce((s, contributor) => { return s + contributor.contributions; }, 0);
      return {
        subscribers_count: repoData.subscribers_count,
        updated_at: new Date(repoData.updated_at),
        stargazers_count: repoData.stargazers_count,
        forks: repoData.forks_count,
        total_commits,
      };
    },
  },
});
