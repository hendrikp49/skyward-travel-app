import { ALL_BANNER } from "@/pages/api/banner";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BannerContext = createContext();

const BannerContextProvider = ({ children }) => {
  const [dataBanner, setDataBanner] = useState([]);

  const handleDataBanner = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ALL_BANNER}`, config)
      .then((res) => setDataBanner(res.data.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <BannerContext.Provider value={{ dataBanner, handleDataBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export default BannerContextProvider;
