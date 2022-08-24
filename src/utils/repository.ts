import { Repository } from '../types/profile';

const sortByName = (repositoryA: Repository, repositoryB: Repository) => {
  if (repositoryA.name > repositoryB.name) {
    return 1;
  }
  if (repositoryB.name > repositoryA.name) {
    return -1;
  }
  return 0;
};

const sortByForkAndStarCounts = (repositoryA: Repository, repositoryB: Repository) => {
  const totalA = repositoryA.forkCount + repositoryA.starCount;
  const totalB = repositoryB.forkCount + repositoryB.starCount;
  if (totalB > totalA) {
    return 1;
  }
  if (totalA > totalB) {
    return -1;
  }
  return 0;
};

export const getTopFourRepositories = (repositories: Repository[]): Repository[] => {
  const sortedRepos = repositories.sort((a, b) =>
    a.forkCount + a.starCount !== b.forkCount + b.starCount ? sortByForkAndStarCounts(a, b) : sortByName(a, b),
  );
  return sortedRepos.slice(0, 4);
};
