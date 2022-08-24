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
    fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
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
      )
      .mockImplementationOnce(
        jest.fn(async () =>
          Promise.resolve({
            status: 200,
            json: async () =>
              Promise.resolve([
                { name: 'repo1', url: 'http://github.com/repo1', forkCount: 3, starCount: 5 },
                { name: 'repo2', url: 'http://github.com/repo2', forkCount: 1, starCount: 4 },
              ]),
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

    expect(title).toBeVisible();
  });

  it('allows entering text in the Username field', () => {
    render(<ProfileSearchView />);

    fireEvent.change(usernameTextbox(), { target: { value: username } });

    expect(usernameTextbox()).toHaveValue(username);
  });

  it('displays a loading spinner while the request is being made', async () => {
    render(<ProfileSearchView />);

    fireEvent.change(usernameTextbox(), { target: { value: username } });
    fireEvent.click(searchButton());

    expect(loadingSpinner()).toBeVisible();
    await waitForElementToBeRemoved(loadingSpinner());
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  it.each([
    [
      'search button is clicked',
      () => {
        fireEvent.change(usernameTextbox(), { target: { value: username } });
        fireEvent.click(searchButton());
      },
    ],
    [
      'enter key is pressed',
      () => {
        fireEvent.change(usernameTextbox(), { target: { value: username } });
        fireEvent.keyDown(searchButton(), { key: 'Enter', code: 'Enter', charCode: 13 });
      },
    ],
  ])('requests the user profile and repository when the %s', async (_, setUp) => {
    render(<ProfileSearchView />);

    setUp();

    await waitForElementToBeRemoved(loadingSpinner());

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenNthCalledWith(1, `https://api.github.com/users/${username}`);
    expect(fetchSpy).toHaveBeenNthCalledWith(2, `https://api.github.com/users/${username}/repos`);
  });

  it('displays the user profile', async () => {
    render(<ProfileSearchView />);
    fireEvent.change(usernameTextbox(), { target: { value: username } });
    fireEvent.click(searchButton());

    await waitForElementToBeRemoved(loadingSpinner());

    expect(screen.getByText(`Username: ${username}`)).toBeVisible();
    expect(screen.getByText(`Number of repositories: ${repoCount}`)).toBeVisible();
    expect(screen.getByText(`Number of followers: ${followerCount}`)).toBeVisible();
    expect(screen.getByRole('img', { name: 'Profile Avatar' })).toHaveAttribute('src', avatarUrl);
    expect(screen.getAllByLabelText(/Click here to visit/)).toHaveLength(2);
  });
});
