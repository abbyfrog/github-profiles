import React from 'react';
import { Alert, Card, CardHeader, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { ProfileView } from '../Profile/ProfileView';
import { Profile, UserDTO } from '../../types/profile';

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

      fetch(`https://api.github.com/users/${username}`)
        .then(async (response: Response) => {
          if (response.status === 200) {
            const user = (await response.json()) as UserDTO;
            setProfile({
              username: user.login,
              avatarUrl: user.avatar_url,
              repositoryCount: user.public_repos,
              followerCount: user.followers,
            });
          } else {
            handleFetchError(response);
          }
        })
        .catch((err: unknown) => handleFetchError(err))
        .finally(() => setLoading(false));
    },
    [handleFetchError],
  );

  return (
    <Card>
      <CardHeader title="GitHub profile finder" />
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
          repositoryCount={profile.repositoryCount}
          username={profile.username}
        />
      )}
    </Card>
  );
};
