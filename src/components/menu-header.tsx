import { useState } from "react";
import { useAppContext } from "../AppContext";
import { Box, Button } from "@mui/material";
import StyledButtonText from '../StyledComponents/StyledButtonText'

const MenuHeader: React.FC = () => {
  const { updateApi, updateStart, updateEnd } = useAppContext();
  const [activeButton, setActiveButton] = useState("");

  const handleChange = (inp: string) => {
    if (activeButton === "" && inp === "Past") return;
    setActiveButton(inp);
    const newApi =
      inp === "New"
        ? "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
        : "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    updateApi(newApi);
    updateStart(0);
    updateEnd(5);
  };

  return (
    <Box mt={2} pr={2} pl={2}>
      <Button
        data-testid="new-button"
        style={{
          backgroundColor: activeButton === "New" ? "#FBC91B" : "#F2F2F2",
          marginRight: "8px",
          padding: "6px 19px",
          borderRadius: "12px",
        }}
        onClick={() => handleChange("New")}
      >
        <StyledButtonText>New</StyledButtonText>
      </Button>
      <Button
        data-testid="past-button"
        style={{
          backgroundColor: activeButton === "Past" ? "#FBC91B" : "#F2F2F2",
          padding: "6px 19px",
          borderRadius: "12px",
        }}
        onClick={() => handleChange("Past")}
      >
        <StyledButtonText>Past</StyledButtonText>
      </Button>
    </Box>
  );
};

export default MenuHeader;