import { render, fireEvent } from '@testing-library/react';
import MenuHeader from './menu-header';
import { useAppContext } from '../AppContext';

jest.mock('../AppContext');

describe('MenuHeader component', () => {
  test('calls handleChange function with appropriate arguments when buttons are clicked', () => {
    const updateApiMock = jest.fn();
    const updateStartMock = jest.fn();
    const updateEndMock = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      updateApi: updateApiMock,
      updateStart: updateStartMock,
      updateEnd: updateEndMock,
    });

    const { getByTestId } = render(<MenuHeader />);
    const newButton = getByTestId('new-button');
    const pastButton = getByTestId('past-button');

    expect(newButton).toBeVisible();
    expect(pastButton).toBeVisible();

    fireEvent.click(newButton);

    expect(updateApiMock).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'
    );
    expect(updateStartMock).toHaveBeenCalledWith(0);
    expect(updateEndMock).toHaveBeenCalledWith(5);

    fireEvent.click(pastButton);

    expect(updateApiMock).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
  });

  test('does not update API when "Past" button is clicked and activeButton is empty', () => {
    const mockUpdateApi = jest.fn();
    const mockUpdateStart = jest.fn();
    const mockUpdateEnd = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      updateApi: mockUpdateApi,
      updateStart: mockUpdateStart,
      updateEnd: mockUpdateEnd,
    });

    const { getByTestId } = render(<MenuHeader />);
    const pastButton = getByTestId('past-button');

    fireEvent.click(pastButton);

    expect(mockUpdateApi).not.toHaveBeenCalled();
    expect(mockUpdateStart).not.toHaveBeenCalled();
    expect(mockUpdateEnd).not.toHaveBeenCalled();
  });
});
