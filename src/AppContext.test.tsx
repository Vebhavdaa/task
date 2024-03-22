import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { AppContextProvider, useAppContext } from "./AppContext";

describe("AppContextProvider", () => {
  test("renders its children", () => {
    const { getByTestId } = render(
      <AppContextProvider>
        <div data-testid="child-component">Child Component</div>
      </AppContextProvider>
    );
    const childComponent = getByTestId("child-component");
    expect(childComponent).toBeInTheDocument();
  });

  test("throws an error if used outside AppContextProvider", () => {
    const Component = () => {
      useAppContext();
      return <div />;
    };

    const renderComponent = () => render(<Component />);

    expect(renderComponent).toThrow(
      "useAppContext must be used within an AppContextProvider"
    );
  });

  test("provides context values to children components through useAppContext hook", () => {
    const ContextChecker: React.FC = () => {
      const context = useAppContext();
      return (
        <div>
          <span data-testid="context-check">
            {context ? "Context is provided" : "Context is not provided"}
          </span>
        </div>
      );
    };

    const { getByTestId } = render(
      <AppContextProvider>
        <ContextChecker />
      </AppContextProvider>
    );

    const contextCheck = getByTestId("context-check");
    expect(contextCheck).toBeInTheDocument();
  });

  test("fetches IDs and data on initialization", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve([1, 2, 3, 4, 5]),
    } as Response);
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve({ id: 1, title: "Test News 1" }),
    } as Response);
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve({ id: 2, title: "Test News 2" }),
    } as Response);
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve({ id: 3, title: "Test News 3" }),
    } as Response);
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve({ id: 4, title: "Test News 4" }),
    } as Response);
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: () => Promise.resolve({ id: 5, title: "Test News 5" }),
    } as Response);

    await act(async () => {
      render(
        <AppContextProvider>
          <div data-testid="child-component">Child Component</div>
        </AppContextProvider>
      );
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/item/1.json?print=pretty"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/item/2.json?print=pretty"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/item/3.json?print=pretty"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/item/4.json?print=pretty"
    );
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/item/5.json?print=pretty"
    );
  });

  test("logs an error if fetching IDs fails", async () => {
    console.error = jest.fn();

    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (typeof url === "string" && url.includes("topstories")) {
        return Promise.reject(new Error("Failed to fetch IDs"));
      } else {
        return Promise.reject(new Error("Failed to fetch data"));
      }
    });

    render(
      <AppContextProvider>
        <div data-testid="child-component">Child Component</div>
      </AppContextProvider>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching IDs:",
        expect.any(Error)
      );
    });
  });

  test('updateApi updates the api value in context', async () => {
    let updateApi: (newApi: string) => void;

    global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue([]) });

    const ChildComponent: React.FC = () => {
      const { api, updateApi: contextUpdateApi } = useAppContext();
      updateApi = contextUpdateApi;
      return <div data-testid="child-component">{api}</div>;
    };

    const { getByTestId } = render(
      <AppContextProvider>
        <ChildComponent />
      </AppContextProvider>
    );

    const newApi = 'https://example.com/api';

    await act(async () => {
      updateApi(newApi);
    });

    expect(getByTestId('child-component').textContent).toBe(newApi);
  });

  test("updateStart updates the start value in context", async () => {
    let startValue: number = 0;
    const TestComponent: React.FC = () => {
      const { start, updateStart } = useAppContext();
      startValue = start;
      return (
        <button
          onClick={() => updateStart(start + 1)}
          data-testid="update-start-button"
        >
          Update Start
        </button>
      );
    };

    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: () => Promise.resolve([1, 2, 3, 4, 5]) });

    const { getByTestId } = render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    const updateButton = getByTestId("update-start-button");
    expect(startValue).toBe(0);
    await act(async () => {
      updateButton.click();
    });
    expect(startValue).toBe(1);
  });

  test("updateEnd updates the end value in context", async () => {
    let endValue: number = 0;
    const TestComponent: React.FC = () => {
      const { end, updateEnd } = useAppContext();
      endValue = end;
      return (
        <button
          onClick={() => updateEnd(end + 1)}
          data-testid="update-end-button"
        >
          Update End
        </button>
      );
    };

    global.fetch = jest
      .fn()
      .mockResolvedValue({ json: () => Promise.resolve([1, 2, 3, 4, 5]) });

    const {  getByTestId } = render(
      <AppContextProvider>
        <TestComponent />
      </AppContextProvider>
    );

    const updateButton = getByTestId("update-end-button");
    expect(endValue).toBe(5);
    await act(async () => {
      updateButton.click();
    });
    expect(endValue).toBe(6);
  });
});
