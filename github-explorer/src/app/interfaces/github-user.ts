export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}
