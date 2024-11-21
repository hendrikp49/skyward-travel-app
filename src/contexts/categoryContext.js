import { CATEGORY } from "@/pages/api/category";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { createContext, useState } from "react";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [dataCategory, setDataCategory] = useState([]);

  const handleDataCategory = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + CATEGORY}`, config)
      .then((res) => setDataCategory(res.data.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <CategoryContext.Provider value={{ dataCategory, handleDataCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
