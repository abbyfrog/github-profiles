import React from 'react';
import { Avatar, Card, Link, Typography } from '@mui/material';
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
      {topRepositories.map((repo, index) => (
        <Typography>
          {index + 1}:{' '}
          <Link href={repo.url} key={`${repo.name}-${repo.url}`}>
            {repo.name}
          </Link>
        </Typography>
      ))}
    </Card>
  );
};
