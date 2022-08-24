import React from 'react';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ProfileSearchView } from '../ProfileSearchView';
import { loadingSpinner, searchButton, usernameTextbox } from './helpers';

describe('ProfileSearchView', () => {
  const username = 'frogs-r-cool-123';
  const avatarUrl = 'https://avatars.githubusercontent.com/u/1234567?v=4';
  const followerCount = 4;
  const repoCount = 7;
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(async () =>
        Promise.resolve({
          status: 200,
          json: async () =>
            Promise.resolve({
              avatar_url: avatarUrl,
              followers: followerCount,
              login: username,
              public_repos: repoCount,
            }),
        }),
      ) as jest.Mock,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders title', () => {
    render(<ProfileSearchView />);

    const title = screen.getByRole('heading', { name: 'GitHub profile finder' });

    expect(title).toBeInTheDocument();
  });

  it('allows entering text in the Username field', () => {
    render(<ProfileSearchView />);

    fireEvent.change(usernameTextbox(), { target: { value: username } });

    expect(usernameTextbox()).toHaveValue(username);
  });

  describe('getting the user profile', () => {
    it('displays a loading spinner while the request is being made', async () => {
      render(<ProfileSearchView />);

      fireEvent.change(usernameTextbox(), { target: { value: username } });
      fireEvent.click(searchButton());

      expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    });

    it('requests the user profile when the search button is clicked', async () => {
      render(<ProfileSearchView />);

      fireEvent.change(usernameTextbox(), { target: { value: username } });
      fireEvent.click(searchButton());

      await waitForElementToBeRemoved(loadingSpinner());

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/users/${username}`);
    });

    it('requests the user profile when the enter key is pressed', async () => {
      render(<ProfileSearchView />);

      fireEvent.change(usernameTextbox(), { target: { value: username } });
      fireEvent.keyDown(searchButton(), { key: 'Enter', code: 'Enter', charCode: 13 });

      await waitForElementToBeRemoved(loadingSpinner());

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/users/${username}`);
    });
  });

  describe('displaying the user profile', () => {
    it('displays the username and number of repositories and followers', async () => {
      render(<ProfileSearchView />);
      fireEvent.change(usernameTextbox(), { target: { value: username } });
      fireEvent.click(searchButton());

      await waitForElementToBeRemoved(loadingSpinner());

      expect(screen.getByText(`Username: ${username}`)).toBeInTheDocument();
      expect(screen.getByText(`Number of repositories: ${repoCount}`)).toHaveTextContent('7');
      expect(screen.getByText(`Number of followers: ${followerCount}`)).toHaveTextContent('4');
    });

    it('displays the user avatar', async () => {
      render(<ProfileSearchView />);

      fireEvent.change(usernameTextbox(), { target: { value: username } });
      fireEvent.click(searchButton());

      await waitForElementToBeRemoved(loadingSpinner());

      expect(screen.getByAltText('Profile Avatar')).toHaveAttribute('src', avatarUrl);
    });
  });
});
