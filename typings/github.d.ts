export type RepoBasicInfo = {
  owner: string,
  reponame: string,
}

export type LanguageOccupation = {
  lang: string,
  ratio: number,
  lines?: number,
}

export type RepositoryInfo = {
  subscribers_count: number,
  forks: number,
  updated_at: Date,
  stargazers_count: number,
  total_commits: number,
  languages: LanguageOccupation[],
}
