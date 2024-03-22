import { render } from '@testing-library/react';
import Footer from './footer-comp';

describe('Footer', () => {
  test('renders footer logo', () => {
    const { getByTestId } = render(<Footer />);
    const footerLogo = getByTestId('footer-logo'); 
    expect(footerLogo).toBeInTheDocument();
  });

  test('renders footer app bar with correct styles', () => {
    const { getByTestId } = render(<Footer />);
    const footerAppBar = getByTestId('footer-appbar'); 
    expect(footerAppBar).toBeInTheDocument();
    expect(footerAppBar).toHaveStyle({
      position: 'sticky',
      top: 'auto',
      bottom: 0,
      backgroundColor: '#FBC91B',
      boxShadow: '0px -3px 28px 0px #00000014',
      height: '99px',
    });
  });
});
