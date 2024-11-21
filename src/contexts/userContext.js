import { API_KEY, BASE_URL } from "@/pages/api/config";
import { LOGGED_USER } from "@/pages/api/user";
import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const handleUser = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + LOGGED_USER}`, config)
      .then((res) => setUser(res.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <UserContext.Provider value={{ user, handleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
