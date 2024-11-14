import { createContext, useState } from "react";

export const PageContext = createContext();

const PageContextProvider = ({ children }) => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });
  return (
    <PageContext.Provider value={{ pagination, setPagination }}>
      {children}
    </PageContext.Provider>
  );
};

export default PageContextProvider;
