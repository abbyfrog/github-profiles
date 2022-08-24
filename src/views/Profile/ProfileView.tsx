import React from 'react';
import { Avatar, Box, Card, Link, Typography } from '@mui/material';
import { Profile, Repository } from '../../types/profile';
import { styles } from './styles';
import { getTopFourRepositories } from '../../utils/repository';

const TopRepositories: React.FC<{ repositories: Repository[] }> = ({ repositories }) => {
  if (repositories.length === 0) {
    return <Typography>No public repositories for this user</Typography>;
  }

  const topRepositories = getTopFourRepositories(repositories);
  return (
    <>
      {topRepositories.map((repo, index) => (
        <Typography key={`${repo.name}-${repo.url}`}>
          {index + 1}:{' '}
          <Link href={repo.url} aria-label={`Click here to visit the ${repo.name} repository`}>
            {repo.name}
          </Link>
        </Typography>
      ))}
    </>
  );
};

export const ProfileView: React.FC<Profile> = ({
  avatarUrl,
  followerCount,
  repositories,
  repositoryCount,
  username,
}) => (
  <Card style={styles.card}>
    <Box style={styles.splitRow}>
      <Box>
        <Typography>Username: {username}</Typography>
        <Typography>Number of repositories: {repositoryCount}</Typography>
        <Typography>Number of followers: {followerCount}</Typography>
        <Typography style={styles.listPadding}>
          Top 4 repositories: <TopRepositories repositories={repositories} />
        </Typography>
      </Box>
      <Avatar alt="Profile Avatar" src={avatarUrl} sx={styles.avatar} />
    </Box>
  </Card>
);
