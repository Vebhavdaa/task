import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/menu-header', () => () => <div data-testid="menu-header">Mocked Menu Header</div>);
jest.mock('./components/site-name-header', () => () => <div data-testid="site-name-header">Mocked Site Name Header</div>);
jest.mock('./components/footer-comp', () => () => <div data-testid="footer">Mocked Footer</div>);
jest.mock('./components/load-more-button', () => () => <button onClick={jest.fn()} data-testid="load-more-button">Load More</button>);
jest.mock('./components/news-card-list', () => () => (
  <div data-testid="news-card-list">
    <div data-testid="news-card">Mocked News Card 1</div>
    <div data-testid="news-card">Mocked News Card 2</div>
  </div>
));

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders site name header', () => {
    const siteNameHeader = screen.getByTestId('site-name-header');
    expect(siteNameHeader).toBeInTheDocument();
  });

  test('renders menu header', () => {
    const menuHeader = screen.getByTestId('menu-header');
    expect(menuHeader).toBeInTheDocument();
  });

  test('renders news card list', () => {
    const newsCardList = screen.getByTestId('news-card-list');
    expect(newsCardList).toBeInTheDocument();
  });

  test('renders load more button', () => {
    const loadMoreButton = screen.getByTestId('load-more-button');
    expect(loadMoreButton).toBeInTheDocument();
  });

  test('renders footer', () => {
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
