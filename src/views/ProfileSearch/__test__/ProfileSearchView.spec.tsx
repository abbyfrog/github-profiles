import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ProfileSearchView } from '../ProfileSearchView';

describe('ProfileSearchView', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(async () =>
        Promise.resolve({
          json: async () => Promise.resolve({}),
        }),
      ) as jest.Mock,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders title', () => {
    render(<ProfileSearchView />);

    const title = screen.getByText('GitHub profile finder');

    expect(title).toBeInTheDocument();
  });

  it('allows entering text in the Username field', () => {
    render(<ProfileSearchView />);

    const usernameField = screen.getByRole('textbox', { name: 'Username' });
    fireEvent.change(usernameField, { target: { value: 'frogs-r-cool-123' } });

    expect(usernameField).toHaveValue('frogs-r-cool-123');
  });

  describe('getting the user profile', () => {
    it('requests the user profile when the search button is clicked', () => {
      const username = 'frogs-r-cool-123';
      render(<ProfileSearchView />);

      const usernameField = screen.getByRole('textbox', { name: 'Username' });
      const searchButton = screen.getByRole('button', { name: 'Search profiles' });
      fireEvent.change(usernameField, { target: { value: username } });
      fireEvent.click(searchButton);

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/users/${username}`);
    });

    it('requests the user profile when the enter key is pressed', () => {
      const username = 'frogs-r-cool-123';
      render(<ProfileSearchView />);

      const usernameField = screen.getByRole('textbox', { name: 'Username' });
      fireEvent.change(usernameField, { target: { value: username } });
      fireEvent.keyDown(usernameField, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/users/${username}`);
    });
  });
});
