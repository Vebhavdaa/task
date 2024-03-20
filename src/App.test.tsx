import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./components/menu-header", () => () => <div data-testid="menu-header" />);
jest.mock("./components/site-name-header", () => () => <div data-testid="site-name-header" />);
jest.mock("./components/news-card", () => ({ news }: { news: any }) => <div data-testid={`news-card-${news.id}`} />);
jest.mock("./components/load-more-button", () => ({ setEnd }: { setEnd: Function }) => <button onClick={() => setEnd(10)} data-testid="load-more-button">Load More</button>);
jest.mock("./components/footer-comp", () => () => <div data-testid="footer" />);





describe("App component", () => {
  test("renders basic elements", () => {
    render(<App />);
    expect(screen.getByTestId("site-name-header")).toBeInTheDocument();
    expect(screen.getByTestId("menu-header")).toBeInTheDocument();
    expect(screen.getByTestId("load-more-button")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("fetches IDs on initial render", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    });
  
    await act(async () => { 
      render(<App />);
    });
  
    expect(global.fetch).toHaveBeenCalledWith(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    );
    
  });
});