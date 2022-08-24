import React from 'react';
import { Avatar, Box, Card, Link, Typography } from '@mui/material';
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
    <Card style={styles.card}>
      <Box style={styles.splitRow}>
        <Box>
          <Typography>Username: {username}</Typography>
          <Typography>Number of repositories: {repositoryCount}</Typography>
          <Typography>Number of followers: {followerCount}</Typography>
          <Typography style={styles.listPadding}>
            Top 4 repositories:
            {topRepositories.map((repo, index) => (
              <Typography>
                {index + 1}:{' '}
                <Link href={repo.url} key={`${repo.name}-${repo.url}`}>
                  {repo.name}
                </Link>
              </Typography>
            ))}
          </Typography>
        </Box>
        <Avatar alt="Profile Avatar" src={avatarUrl} sx={styles.avatar} />
      </Box>
    </Card>
  );
};
