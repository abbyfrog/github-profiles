import { RepositoryDTO, UserDTO } from './dtos';

export type Profile = {
  avatarUrl: UserDTO['avatar_url'];
  followerCount: UserDTO['followers'];
  repositories: Repository[];
  repositoryCount: UserDTO['public_repos'];
  username: UserDTO['login'];
};

export type Repository = {
  name: RepositoryDTO['name'];
  forkCount: RepositoryDTO['forks_count'];
  starCount: RepositoryDTO['stargazers_count'];
  url: RepositoryDTO['html_url'];
};
