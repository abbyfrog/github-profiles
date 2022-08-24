import { screen } from '@testing-library/react';

export const usernameTextbox = () => screen.getByRole('textbox', { name: 'Username' });
export const searchButton = () => screen.getByRole('button', { name: 'Search profiles' });
export const loadingSpinner = () => screen.getByRole('progressbar');
