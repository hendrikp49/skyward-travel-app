import { createContext, useState } from "react";

export const IsOpenContext = createContext();

const IsOpenContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <IsOpenContext.Provider value={{ isOpen, handleOpen, setIsOpen }}>
      {children}
    </IsOpenContext.Provider>
  );
};

export default IsOpenContextProvider;
