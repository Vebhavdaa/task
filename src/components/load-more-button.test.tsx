import { render, fireEvent } from '@testing-library/react';
import LoadMoreButton from './load-more-button';
import { useAppContext } from '../AppContext';

jest.mock('../AppContext', () => ({
  useAppContext: jest.fn(),
}));

describe('LoadMoreButton Component', () => {
  test('increments "end" state when clicked', () => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const end = 5;
    const updateEndMock = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      ids,
      end,
      updateEnd: updateEndMock,
    });

    const { getByTestId } = render(<LoadMoreButton />);
    const loadMoreButton = getByTestId('load-more-button');

    fireEvent.click(loadMoreButton);

    expect(updateEndMock).toHaveBeenCalledWith(end + 5);
  });

  test('does not increment "end" state when clicked if ids.length <= end', () => {
    const ids = [1, 2, 3, 4, 5];
    const end = 5;
    const updateEndMock = jest.fn();

    (useAppContext as jest.Mock).mockReturnValue({
      ids,
      end,
      updateEnd: updateEndMock,
    });

    const { getByTestId } = render(<LoadMoreButton />);
    const loadMoreButton = getByTestId('load-more-button');

    fireEvent.click(loadMoreButton);

    expect(updateEndMock).not.toHaveBeenCalled();
  });
});
