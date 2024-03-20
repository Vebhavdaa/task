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

    const metadataElement = getByTestId('news-metadata');
    expect(metadataElement).toBeInTheDocument();

    const expectedTimestampRegex = /\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/;
    expect(metadataElement.textContent).toMatch(expectedTimestampRegex);

    const expectedScoreRegex = new RegExp(`${mockNews.score} Comments`);
    expect(metadataElement.textContent).toMatch(expectedScoreRegex);
  });
});
