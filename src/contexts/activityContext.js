import { ACTIVITIES } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { createContext, useState } from "react";

export const ActivityContext = createContext();

const ActivityContextProvider = ({ children }) => {
  const [dataActivity, setDataActivity] = useState([]);

  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ACTIVITIES}`, config)
      .then((res) => {
        setDataActivity(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <ActivityContext.Provider value={{ dataActivity, handleDataActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContextProvider;
