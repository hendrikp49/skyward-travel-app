import { API_KEY, BASE_URL } from "@/pages/api/config";
import { TRANSACTIONS } from "@/pages/api/transaction";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();

const TransactionContextProvider = ({ children }) => {
  const [allTransaction, setAllTransaction] = useState([]);
  const handleAllTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + TRANSACTIONS}`, config)
      .then((res) => {
        setAllTransaction(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <TransactionContext.Provider
      value={{ allTransaction, handleAllTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
