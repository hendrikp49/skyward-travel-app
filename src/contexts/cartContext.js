import { CARTS } from "@/pages/api/cart";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [dataCart, setDataCart] = useState([]);

  const handleDataCart = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    axios
      .get(`${BASE_URL + CARTS}`, config)
      .then((res) => {
        setDataCart(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <CartContext.Provider value={{ dataCart, setDataCart, handleDataCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
