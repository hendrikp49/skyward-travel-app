import axios from "axios";
import { useEffect, useState } from "react";
import { LOGGED_USER } from "../api/user";
import { API_KEY, BASE_URL } from "../api/config";
import Image from "next/image";

const User = () => {
  const [dataUser, setDataUser] = useState({});

  const handleUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + LOGGED_USER}`, config)
      .then((res) => {
        setDataUser(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div>
      <img
        src={dataUser.profilePictureUrl}
        alt="profilePictureUrl"
        className="w-24 rounded-full aspect-square"
      />
      <h1>{dataUser.name}</h1>
      <p>{dataUser.email}</p>
      <p>{dataUser.role}</p>
      <p>{dataUser.phoneNumber}</p>
    </div>
  );
};

export default User;
