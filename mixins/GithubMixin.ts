import { RepoBasicInfo, RepositoryInfo } from '@/types/github/github';
import { Octokit } from 'octokit';

export const GithubMixin = {
  methods: {
    url2info (url: string): RepoBasicInfo | null {
      const re = /https:\/\/github\.com\/([a-zA-Z0-9]*)\/([a-zA-Z0-9]*).*/;
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
      const result = await octokit.request('GET /repos/{owner}/{repo}', { owner, repo })
        .catch(() => Promise.resolve(null));
      console.log(result.data)
      if (result === undefined || result === null) { return null; } else {
        const data = result.data;
        return {
          subscribers_count: data.subscribers_count,
          updated_at: new Date(data.updated_at),
          stargazers_count: data.stargazers_count,
          forks: data.forks_count,
        };
      }
    },
  },
};
