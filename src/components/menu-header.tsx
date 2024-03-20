import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

interface MenuHeaderProps {
  setApi: React.Dispatch<React.SetStateAction<string>>;
  setStart: React.Dispatch<React.SetStateAction<number>>;
  setEnd: React.Dispatch<React.SetStateAction<number>>;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ setApi, setStart, setEnd }) => {
  const [activeButton, setActiveButton] = useState<string>('');

  const handleChange = (inp: string) => {
    if (activeButton === 'New' && inp === 'New') return; // Do nothing if 'New' button is already active
    setActiveButton(inp);
    const newApi = inp === 'New' ? 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty' : 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    setApi(newApi);
    setStart(0);
    setEnd(5);
  };

  return (
    <Box mt={2} pr={2} pl={2}>
      <Button
        className={activeButton === 'New' ? 'active-button' : 'inactive-button'}
        onClick={() => handleChange('New')}
        data-testid="new-button"
      >
        <span className='menu-button button-font'>New</span>
      </Button>
      <Button
        className={activeButton === 'Past' ? 'active-button' : 'inactive-button'}
        onClick={() => handleChange('Past')}
        data-testid="past-button"
      >
        <span className='menu-button button-font'>Past</span>
      </Button>
    </Box>
  );
};

export default MenuHeader;
