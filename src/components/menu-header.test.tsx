import { fireEvent, render } from "@testing-library/react";
import MenuHeader from "./menu-header";

describe("MenuHeader component", () => {
  test("calls handleChange function with appropriate arguments when buttons are clicked", () => {
    const setApiMock = jest.fn();
    const setStartMock = jest.fn();
    const setEndMock = jest.fn();

    const { getByTestId } = render(
      <MenuHeader
        setApi={setApiMock}
        setStart={setStartMock}
        setEnd={setEndMock}
      />
    );

    const newButton = getByTestId("new-button");
    const pastButton = getByTestId("past-button");

    fireEvent.click(newButton);

    expect(setApiMock).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    expect(setStartMock).toHaveBeenCalledWith(0);
    expect(setEndMock).toHaveBeenCalledWith(5);

    fireEvent.click(newButton);

    expect(setApiMock).toHaveBeenCalledTimes(1);
    expect(setStartMock).toHaveBeenCalledTimes(1);
    expect(setEndMock).toHaveBeenCalledTimes(1);

    fireEvent.click(pastButton);
    expect(setApiMock).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  });
});
