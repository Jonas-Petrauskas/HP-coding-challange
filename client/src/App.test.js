import { render, screen } from '@testing-library/react';
import App from './App';

const promise = Promise.resolve();
const postMock = jest.fn(() => promise);
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

beforeEach(() => {
  render(<App  searchAlbums={postMock}/>)
});

describe('Search Input rendering', () => {
  test('Renders search input field', () => {
    const searchInputField = screen.getByTestId('searchInput');
    expect(searchInputField).toBeInTheDocument();
  })
})
