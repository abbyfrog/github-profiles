import React from 'react';
import { Avatar, Card, Typography } from '@mui/material';
import { Profile } from '../../types/profile';
import { styles } from './styles';

export const ProfileView: React.FC<Profile> = ({ avatarUrl, followerCount, repositoryCount, username }) => (
  <Card>
    <Typography>Username: {username}</Typography>
    <Avatar alt="Profile Avatar" src={avatarUrl} sx={styles.avatar} />
    <Typography>Number of repositories: {repositoryCount}</Typography>
    <Typography>Number of followers: {followerCount}</Typography>
    <Typography>Top 4 repositories: TODO</Typography>
  </Card>
);
