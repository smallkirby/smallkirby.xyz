import { User, RepositoryInfo } from '@/types/github/github';
import { Octokit } from 'octokit';
import { Commit } from 'vuex';

export interface State {
  githubUsers: User[],
  githubRepos: {
   [owner: string]: RepositoryInfo[],
  },
};

/*******************************/

const fetchUserNoCache = async (owner: string) => {
  const octokit = new Octokit();
  const userResult = await octokit.request('GET /users/{username}', { username: owner });
  if (userResult.data === undefined) { return null; }
  const data = userResult.data;
  return {
    name: data.login as string,
    displayName: data.name as string,
    id: data.id as number,
    url: data.url as string,
    created_at: new Date(data.created_at as string),
    public_repos: data.public_repos as number,
  };
};

/*******************************/

export const state: () => State = () => ({
  githubUsers: [],
  githubRepos: {},
});

export const getters = {
  allUsers (state: State) {
    return state.githubUsers;
  },
};

export const mutations = {
  setGithubRepositories (state: State, { owner, repos }: { owner: string, repos: RepositoryInfo[]}) {
    state.githubRepos[owner] = repos;
  },

  setGithubUser (state: State, { userInfo }: { userInfo: User }) {
    const ix = state.githubUsers.findIndex((user) => { return user.id === userInfo.id; });
    if (ix !== -1) {
      state.githubUsers = state.githubUsers.splice(ix, 1);
    }
    state.githubUsers.push(userInfo);
  },

  clearAllUsers (state: State) {
    state.githubUsers = [];
  },
};

export const actions = {
  // fetch user information and store it
  async fetchUser ({ state, commit }: { state: State, commit: Commit }, owner: string) {
    const ix = state.githubUsers.findIndex((user) => { return user.name === owner; });
    if (ix === -1) {
      const user = await fetchUserNoCache(owner);
      if (user !== null) {
        commit('setGithubUser', { userInfo: user });
      }
    }
  },

  //async fetchAllRepos({ state, commit }: { state: State, commit: Commit }, owner: string) {

  //},
};
