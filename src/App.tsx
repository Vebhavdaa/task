import { useState, useEffect } from "react";
import MenuHeader from "./components/menu-header";
import SiteNameHeader from "./components/site-name-header";
import NewsCard from "./components/news-card";
import LoadMoreButton from "./components/load-more-button";
import { Box } from "@mui/material";
import Footer from "./components/footer-comp";
import "./App.css";

function App() {
  const [ids, setIds] = useState<number[]>([]);
  const [api, setApi] = useState(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );
  const [data, setData] = useState<any[] | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  useEffect(() => {
    if (!api) return;
    fetch(api)
      .then((response) => response.json())
      .then((data) => setIds(data))
      .catch((error) => console.error("Error fetching IDs:", error));
  }, [api]);

  useEffect(() => {
    if (!ids.length) return; // Exit  if ids is empty

    // Fetch data for each id
    Promise.all(
      ids
        .slice(start, end)
        .map((id) =>
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          ).then((response) => response.json())
        )
    )
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [ids, start, end]);

  return (
    <>
      <SiteNameHeader data-testid="site-name-header" />
      <MenuHeader
        setApi={setApi}
        setStart={setStart}
        setEnd={setEnd}
        data-testid="menu-header"
      />
      <Box p={2} >
        {data &&
          data.map((news: any, index: number) => (
            <NewsCard
              key={index} 
              news={news}
              data-testid={`news-card-${index}`}
            />
          ))}

        <LoadMoreButton
          ids={ids}
          end={end}
          setEnd={setEnd}
          data-testid="load-more-button"
        />
      </Box>
      <Footer data-testid="footer" />
    </>
  );
}

export default App;
