import { render } from '@testing-library/react';
import SiteNameHeader from './site-name-header';

describe('SiteNameHeader', () => {
  test('renders site name logo', () => {
    const { getByTestId } = render(<SiteNameHeader />);
    const siteNameLogo = getByTestId('site-logo');
    expect(siteNameLogo).toBeInTheDocument();
  });

  test('renders app bar with correct background color and box shadow', () => {
    const { getByTestId } = render(<SiteNameHeader />);
    const appBar = getByTestId('site-appbar'); 
    expect(appBar).toBeInTheDocument();
    expect(appBar).toHaveStyle({
      backgroundColor: '#ffffff',
      boxShadow: '0px 3px 28px 0px #00000014',
    });
  });
});
