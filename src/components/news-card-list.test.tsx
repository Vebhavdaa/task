import React from 'react';
import { render } from '@testing-library/react';
import NewsCardList from './news-card-list';
import { AppContextType, useAppContext } from '../AppContext'; 
jest.mock('../AppContext');

describe('NewsCardList component', () => {
  test('renders news cards when data is available', () => {
    const mockData: AppContextType = {
      ids: [1, 2],
      data: [{ id: 1, title: 'Test News 1' }, { id: 2, title: 'Test News 2' }],
      api: '',
      start: 0,
      end: 0,
      updateApi: jest.fn(),
      updateStart: jest.fn(),
      updateEnd: jest.fn(),
    };
    (useAppContext as jest.Mock).mockReturnValue(mockData);

    const { getByText } = render(<NewsCardList />);
    expect(getByText('Test News 1')).toBeInTheDocument();
    expect(getByText('Test News 2')).toBeInTheDocument();
  });

  test('renders nothing when there is no data available', () => {
    const mockData: AppContextType = {
      ids: [],
      data: null,
      api: '',
      start: 0,
      end: 0,
      updateApi: jest.fn(),
      updateStart: jest.fn(),
      updateEnd: jest.fn(),
    };
    (useAppContext as jest.Mock).mockReturnValue(mockData);

    const { container } = render(<NewsCardList />);
    expect(container.firstChild).toBeNull();
  });

  test('renders the correct number of news cards', () => {
    const mockData: AppContextType = {
      ids: [1, 2, 3, 4],
      data: [
        { id: 1, title: 'Test News 1' },
        { id: 2, title: 'Test News 2' },
        { id: 3, title: 'Test News 3' },
        { id: 4, title: 'Test News 4' },
      ],
      api: '',
      start: 0,
      end: 0,
      updateApi: jest.fn(),
      updateStart: jest.fn(),
      updateEnd: jest.fn(),
    };
    (useAppContext as jest.Mock).mockReturnValue(mockData);

    const { getAllByTestId } = render(<NewsCardList />);
    expect(getAllByTestId('news-card')).toHaveLength(4);
  });
});
