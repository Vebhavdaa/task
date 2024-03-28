import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { TbClockHour9 } from "react-icons/tb";
import StyledCardTitle from "../StyledComponents/StyledCardTitle";
import StyledMetadata from "../StyledComponents/StyledMetadata";
import StyledDescription from "../StyledComponents/StyledDescription";
import StyledAnchor from "../StyledComponents/StyledAnchor";

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
      <StyledAnchor href={news.url} target="_blank" rel="noopener noreferrer" data-testid="news-link">
        <Card
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 3px 28px 0px #00000014",
          }}
        >
          <CardContent>
          <StyledCardTitle
              gutterBottom
              variant="h5"
              as="div"
              data-testid="news-title"
            >
              {news.title}
            </StyledCardTitle>

            <StyledDescription variant="body2" mt={2} data-testid="news-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </StyledDescription>
            <StyledMetadata
              variant="body2"
              mt={3}
              style={{ display: "flex", alignItems: "center" }}
              data-testid="news-metadata"
            >
              <TbClockHour9 style={{ marginRight: "5px" }} />
              {formatTimestamp(news.time)} | {news.score} Comments
            </StyledMetadata>
          </CardContent>
        </Card>
      </StyledAnchor>
      
    </Box>
  );
};

export default NewsCard;
