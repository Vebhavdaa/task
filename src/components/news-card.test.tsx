import { render } from '@testing-library/react';
import NewsCard from './news-card';

describe('NewsCard component', () => {
  const mockNews = {
    title: 'Test News Title',
    time: 1616072400, 
    score: '10',
    url: 'https://example.com/test-news',
  };

  it('renders news card with correct content', () => {
    const { getByTestId } = render(<NewsCard news={mockNews} />);

    expect(getByTestId('news-card')).toBeInTheDocument();
    expect(getByTestId('news-link')).toHaveAttribute('href', mockNews.url);

    const titleElement = getByTestId('news-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe(mockNews.title);

    const descriptionElement = getByTestId('news-description');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent).not.toBeNull(); 

    expect(descriptionElement.textContent?.trim()).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

    const metadataElement = getByTestId('news-metadata');
    expect(metadataElement).toBeInTheDocument();
    expect(metadataElement.textContent).toContain('3/18/2021, 6:30:00 PM | 10 Comments');
  });
});
