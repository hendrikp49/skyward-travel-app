import { API_KEY, BASE_URL } from "@/pages/api/config";
import { ALL_USER } from "@/pages/api/user";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AllUserContext = createContext();

const AllUserContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const handleDataUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: API_KEY,
      },
    };
    axios
      .get(`${BASE_URL + ALL_USER}`, config)
      .then((res) => {
        setAllUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDataUser();
  }, []);

  return (
    <AllUserContext.Provider value={{ allUsers, setAllUsers, handleDataUser }}>
      {children}
    </AllUserContext.Provider>
  );
};

export default AllUserContextProvider;
