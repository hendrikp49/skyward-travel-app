import { API_KEY, BASE_URL } from "@/pages/api/config";
import { PROMO } from "@/pages/api/promo";
import axios from "axios";
import { createContext, useState } from "react";

export const PromoContext = createContext();

const PromoContextProvider = ({ children }) => {
  const [dataPromo, setDataPromo] = useState([]);
  const handleDataPromo = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + PROMO}`, config)
      .then((res) => {
        setDataPromo(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <PromoContext.Provider value={{ dataPromo, handleDataPromo }}>
      {children}
    </PromoContext.Provider>
  );
};

export default PromoContextProvider;
