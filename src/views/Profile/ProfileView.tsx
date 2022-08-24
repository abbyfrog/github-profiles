import React from 'react';
import { Card, Typography } from '@mui/material';
import { Profile } from '../../types/profile';

export const ProfileView: React.FC<Profile> = ({ avatarUrl, followerCount, repositoryCount, username }) => (
  <Card>
    <Typography>Username: {username}</Typography>
    <Typography>Avatar URL: {avatarUrl}</Typography>
    <Typography>Number of repositories: {repositoryCount}</Typography>
    <Typography>Number of followers: {followerCount}</Typography>
    <Typography>Top 4 repositories: TODO</Typography>
  </Card>
);
