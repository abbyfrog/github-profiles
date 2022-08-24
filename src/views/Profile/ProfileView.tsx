import React from 'react';
import { Avatar, Card, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Profile } from '../../types/profile';
import { styles } from './styles';
import { getTopFourRepositories } from '../../utils/repository';

export const ProfileView: React.FC<Profile> = ({
  avatarUrl,
  followerCount,
  repositories,
  repositoryCount,
  username,
}) => {
  const topRepositories = getTopFourRepositories(repositories);
  return (
    <Card>
      <Typography>Username: {username}</Typography>
      <Avatar alt="Profile Avatar" src={avatarUrl} sx={styles.avatar} />
      <Typography>Number of repositories: {repositoryCount}</Typography>
      <Typography>Number of followers: {followerCount}</Typography>
      <Typography>Top 4 repositories: </Typography>
      {topRepositories.map((repo) => (
        <ListItemButton component="a" href={repo.url} key={`${repo.name}-${repo.url}`}>
          <ListItemText primary={repo.name} />
        </ListItemButton>
      ))}
    </Card>
  );
};
