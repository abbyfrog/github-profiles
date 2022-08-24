import { getTopFourRepositories } from '../repository';
import { Repository } from '../../types/profile';

describe('Repository utils', () => {
  describe('getTopFourRepositories', () => {
    it('returns an empty array if no repositories are passed in', () => {
      expect(getTopFourRepositories([])).toEqual([]);
    });

    it('returns the same repositories that were passed in if there are only four in total', () => {
      const repos: Repository[] = [
        { name: 'abc', url: 'http://abc.example', forkCount: 2, starCount: 1 },
        { name: 'def', url: 'http://def.example', forkCount: 1, starCount: 1 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 3, starCount: 3 },
        { name: 'jkl', url: 'http://jkl.example', forkCount: 7, starCount: 9 },
      ];

      expect(getTopFourRepositories(repos)).toEqual(repos);
    });

    it('returns the top four repositories based on forks', () => {
      const repos: Repository[] = [
        { name: 'abc', url: 'http://abc.example', forkCount: 2, starCount: 0 },
        { name: 'def', url: 'http://def.example', forkCount: 1, starCount: 0 },
        { name: 'mno', url: 'http://mno.example', forkCount: 192, starCount: 0 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 3, starCount: 0 },
        { name: 'jkl', url: 'http://jkl.example', forkCount: 7, starCount: 0 },
        { name: 'pqr', url: 'http://pqr.example', forkCount: 0, starCount: 0 },
      ];

      expect(getTopFourRepositories(repos)).toEqual([
        { name: 'mno', url: 'http://mno.example', forkCount: 192, starCount: 0 },
        { name: 'jkl', url: 'http://jkl.example', forkCount: 7, starCount: 0 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 3, starCount: 0 },
        { name: 'abc', url: 'http://abc.example', forkCount: 2, starCount: 0 },
      ]);
    });

    it('returns the top four repositories based on stars', () => {
      const repos: Repository[] = [
        { name: 'abc', url: 'http://abc.example', forkCount: 0, starCount: 41 },
        { name: 'def', url: 'http://def.example', forkCount: 0, starCount: 1 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 0, starCount: 13 },
        { name: 'jkl', url: 'http://jkl.example', forkCount: 0, starCount: 9 },
        { name: 'mno', url: 'http://mno.example', forkCount: 0, starCount: 50 },
        { name: 'pqr', url: 'http://pqr.example', forkCount: 0, starCount: 39 },
      ];

      expect(getTopFourRepositories(repos)).toEqual([
        { name: 'mno', url: 'http://mno.example', forkCount: 0, starCount: 50 },
        { name: 'abc', url: 'http://abc.example', forkCount: 0, starCount: 41 },
        { name: 'pqr', url: 'http://pqr.example', forkCount: 0, starCount: 39 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 0, starCount: 13 },
      ]);
    });

    it('returns the top four repositories based on forks and stars', () => {
      const repos: Repository[] = [
        { name: 'abc', url: 'http://abc.example', forkCount: 223, starCount: 0 },
        { name: 'def', url: 'http://def.example', forkCount: 24, starCount: 11 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 13, starCount: 33 },
        { name: 'jkl', url: 'http://jkl.example', forkCount: 7, starCount: 199 },
        { name: 'mno', url: 'http://mno.example', forkCount: 192, starCount: 39 },
        { name: 'pqr', url: 'http://pqr.example', forkCount: 0, starCount: 0 },
      ];

      expect(getTopFourRepositories(repos)).toEqual([
        { name: 'mno', url: 'http://mno.example', forkCount: 192, starCount: 39 },
        { name: 'abc', url: 'http://abc.example', forkCount: 223, starCount: 0 },
        { name: 'jkl', url: 'http://jkl.example', forkCount: 7, starCount: 199 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 13, starCount: 33 },
      ]);
    });

    it('returns the top four repositories where there are duplicate fork+star counts', () => {
      const repos: Repository[] = [
        { name: 'double-2b', url: 'http://double-2b.example', forkCount: 192, starCount: 39 },
        { name: 'abc', url: 'http://abc.example', forkCount: 223, starCount: 0 },
        { name: 'def', url: 'http://def.example', forkCount: 24, starCount: 11 },
        { name: 'ghi', url: 'http://ghi.example', forkCount: 13, starCount: 33 },
        { name: 'double-1b', url: 'http://double-1b.example', forkCount: 200, starCount: 6 },
        { name: 'pqr', url: 'http://pqr.example', forkCount: 0, starCount: 0 },
        { name: 'double-1a', url: 'http://double-1a.example', forkCount: 7, starCount: 199 },
        { name: 'stu', url: 'http://stu.example', forkCount: 100, starCount: 2 },
        { name: 'double-2a', url: 'http://double-2.example', forkCount: 39, starCount: 192 },
      ];

      expect(getTopFourRepositories(repos)).toEqual([
        { name: 'double-2a', url: 'http://double-2.example', forkCount: 39, starCount: 192 },
        { name: 'double-2b', url: 'http://double-2b.example', forkCount: 192, starCount: 39 },
        { name: 'abc', url: 'http://abc.example', forkCount: 223, starCount: 0 },
        { name: 'double-1a', url: 'http://double-1a.example', forkCount: 7, starCount: 199 },
      ]);
    });
  });
});
