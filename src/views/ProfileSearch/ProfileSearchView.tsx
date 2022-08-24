import React from 'react';
import { Alert, Box, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ProfileView } from '../Profile/ProfileView';
import { Profile } from '../../types/profile';
import { RepositoryDTO, UserDTO } from '../../types/dtos';

const GITHUB_API_URL = 'https://api.github.com';

const constructProfile = (dtos: { userDTO: UserDTO; repoDTOs: RepositoryDTO[] }) => {
  const { userDTO, repoDTOs } = dtos;
  return {
    username: userDTO.login,
    avatarUrl: userDTO.avatar_url,
    repositories: repoDTOs.map(({ name, html_url, forks_count, stargazers_count }) => ({
      name,
      url: html_url,
      forkCount: forks_count,
      starCount: stargazers_count,
    })),
    repositoryCount: userDTO.public_repos,
    followerCount: userDTO.followers,
  };
};

export const ProfileSearchView: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorFetching, setErrorFetching] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<Profile | undefined>(undefined);

  const handleFetchError = React.useCallback((error: unknown) => {
    console.error('Failed to fetch user: ', error);
    setProfile(undefined);
    setErrorFetching(true);
  }, []);

  const searchProfiles = React.useCallback(
    (username: string) => {
      setLoading(true);
      setErrorFetching(false);

      fetch(`${GITHUB_API_URL}/users/${username}`)
        .then(async (response: Response) => {
          const repositoriesResponse = await fetch(`${GITHUB_API_URL}/users/${username}/repos`);
          if (response.status !== 200 || repositoriesResponse.status !== 200) {
            handleFetchError(response);
            return;
          }
          setProfile(
            constructProfile({
              userDTO: (await response.json()) as UserDTO,
              repoDTOs: (await repositoriesResponse.json()) as RepositoryDTO[],
            }),
          );
        })
        .catch((err: unknown) => handleFetchError(err))
        .finally(() => setLoading(false));
    },
    [handleFetchError],
  );

  return (
    <Box>
      <Typography variant="h3">GitHub profile finder</Typography>
      <TextField
        label="Username"
        value={searchValue}
        onChange={(e) => {
          setErrorFetching(false);
          setLoading(false);
          setSearchValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchProfiles(searchValue);
          }
        }}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="Search profiles" type="submit" onClick={() => searchProfiles(searchValue)}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {loading && <CircularProgress />}
      {errorFetching && <Alert severity="error">Unable to find profile for user: {searchValue}</Alert>}
      {profile && (
        <ProfileView
          avatarUrl={profile.avatarUrl}
          followerCount={profile.followerCount}
          repositories={profile.repositories}
          repositoryCount={profile.repositoryCount}
          username={profile.username}
        />
      )}
    </Box>
  );
};
