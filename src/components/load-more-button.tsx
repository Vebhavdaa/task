import React from 'react';
import { useAppContext } from '../AppContext';
import StyledLoadMoreButton from '../StyledComponents/StyledLoadMoreButton';

const LoadMoreButton: React.FC = () => {
  const { ids, end, updateEnd } = useAppContext();

  const handleClick = () => {
    if (ids.length <= end) return;
    updateEnd(end + 5);
  };

  return (
    <StyledLoadMoreButton onClick={handleClick} data-testid="load-more-button">
       Load More
    </StyledLoadMoreButton>
  );
};

export default LoadMoreButton;
