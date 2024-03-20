import { render } from "@testing-library/react";
import Footer from "./footer-comp";
import footerLogo from "../asset/hackernews-footer.svg";

describe("Footer component", () => {
  test("renders the logo image", () => {
    const { getByAltText } = render(<Footer />);
    const logoImage = getByAltText('Vector');
    
    expect(logoImage).toBeInTheDocument();
    
    expect(logoImage).toHaveAttribute('src', footerLogo);
    expect(logoImage).toHaveAttribute('alt', 'Vector');
  });
});
