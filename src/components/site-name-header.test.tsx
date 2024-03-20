import { render } from '@testing-library/react';
import SiteNameHeader from './site-name-header';

describe('SiteNameHeader component', () => {
  it('renders the header with the correct logo image', () => {
    const { getByAltText } = render(<SiteNameHeader />);
    const logoImage = getByAltText('headerlogo');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders the header with the correct styles', () => {
    const { getByTestId } = render(<SiteNameHeader />);
    const appBar = getByTestId('site-name-header');
    expect(appBar).toHaveStyle('background-color: #ffffff');
    expect(appBar).toHaveStyle('box-shadow: 0px 3px 28px 0px #00000014');
  });
});
