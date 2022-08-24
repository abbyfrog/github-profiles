import React from 'react';
import {
  Alert,
  AlertTitle,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';

export const ProfileSearchView: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const searchProfiles = React.useCallback((profileToSearchFor: string) => {
    setLoading(true);
    setError(undefined);

    fetch(`https://api.github.com/users/${profileToSearchFor}`)
      .then(async (data) => {
        const jsonUser: unknown = await data.json();
        console.log('User: ', jsonUser);
      })
      .catch((err: unknown) => {
        const errorMessage = `Error fetching user: ${JSON.stringify(err, null, 2)}`;
        console.error(errorMessage);
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardHeader title="GitHub profile finder" />
      <TextField
        label="Username"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchProfiles(searchValue);
          }
        }}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" onClick={() => searchProfiles(searchValue)}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {loading && <CircularProgress />}
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
    </Card>
  );
};
