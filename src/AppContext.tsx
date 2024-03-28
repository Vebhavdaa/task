import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AppContextType {
  ids: number[];
  data: any[] | null;
  api: string;
  start: number;
  end: number;
  updateApi: (newApi: string) => void;
  updateStart: (newStart: number) => void;
  updateEnd: (newEnd: number) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [data, setData] = useState<any[] | null>(null);
  const [api, setApi] = useState<string>("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(5);

  useEffect(() => {
    // Fetch the IDs
    fetch(api)
      .then((response) => response.json())
      .then((ids) => {
        if (!ids.length) return; // Exit  if ids is empty
        setIds(ids);
        // Fetch data for each ID
        Promise.all(ids.slice(start, end).map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then((response) => response.json())
        ))
          .then((news) => setData(news))
          .catch((error) => console.error("Error fetching data:", error));
      })
      .catch((error) => console.error("Error fetching IDs:", error));
  }, [api, start, end]);

  const updateApi = (newApi: string) => {
    setApi(newApi);
  };

  const updateStart = (newStart: number) => {
    setStart(newStart);
  };

  const updateEnd = (newEnd: number) => {
    setEnd(newEnd);
  };

  const value: AppContextType = {
    ids,
    data,
    api,
    start,
    end,
    updateApi,
    updateStart,
    updateEnd,
  };

  return (
    <AppContext.Provider value={value} data-testid="app-context-provider">
      {children}
    </AppContext.Provider>
  );
};
