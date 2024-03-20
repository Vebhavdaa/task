import { render, fireEvent } from "@testing-library/react";
import LoadMoreButton from "./load-more-button";

const setEndMock = jest.fn();
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const end = 5;

describe("LoadMoreButton component", () => {
  test('increments "end" state when clicked', () => {
    const { getByTestId } = render(
      <LoadMoreButton setEnd={setEndMock} ids={ids} end={end} />
    );

    const loadMoreButton = getByTestId("load-more-button");
    fireEvent.click(loadMoreButton);

    expect(setEndMock).toHaveBeenCalledWith(end + 5);
  });
});
