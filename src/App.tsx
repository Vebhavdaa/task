import MenuHeader from "./components/menu-header";
import SiteNameHeader from "./components/site-name-header";
import Footer from "./components/footer-comp";
import LoadMoreButton from "./components/load-more-button";
import NewsCardList from "./components/news-card-list";
import "./App.css";
import { Box } from "@mui/material";
import { AppContextProvider } from "./AppContext";

function App() {
  return (
    <AppContextProvider>
      <SiteNameHeader data-testid="site-name-header" />
      <MenuHeader data-testid="menu-header" />
      <Box p={2}>
        <NewsCardList data-testid="news-card-list" />
        <LoadMoreButton data-testid="load-more-button" />
      </Box>
      <Footer data-testid="footer" />
    </AppContextProvider>
  );
}

export default App;
