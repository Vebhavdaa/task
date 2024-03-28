import React from 'react';
import { useAppContext } from '../AppContext';
import NewsCard from './news-card'

const NewsCardList: React.FC = () => {
  const { data } = useAppContext();

  return (
    <>
      {data && data.map((news: any) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </>
  );
};

export default NewsCardList;
