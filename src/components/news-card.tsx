import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TbClockHour9 } from "react-icons/tb";

interface News {
  title: string;
  time: number;
  score: string;
  url: string;
}

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString(); 
  };

  return (
    <Box mb={2} data-testid="news-card">
      <a href={news.url} target="_blank" rel="noopener noreferrer" data-testid="news-link">
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 3px 28px 0px #00000014",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="card-title"
              data-testid="news-title"
            >
              {news.title}
            </Typography>

            <Typography variant="body2" className="description" mt={2} data-testid="news-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            
            <Typography
              variant="body2"
              mt={3}
              className="metadata"
              data-testid="news-metadata"
            >
              <TbClockHour9 style={{ marginRight: "5px" }} />
              {formatTimestamp(news.time)} | {news.score} Comments
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Box>
  );
};

export default NewsCard;
