import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../../api/config";
import axios from "axios";
import { UPDATE_USER, LOGGED_USER } from "../../api/user";
import { getCookie } from "cookies-next";

const UpdateProfile = () => {
  const [dataUser, setDataUser] = useState({});

  const handleUser = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + LOGGED_USER}`, config)
      .then((res) => setDataUser(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: dataUser.name,
      email: dataUser.email,
      profilePictureUrl: dataUser.profilePictureUrl,
      phoneNumber: dataUser.phoneNumber,
    };
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .post(`${BASE_URL + UPDATE_USER}`, payload, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={dataUser.name}
        />
        <label htmlFor="">email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={dataUser.email}
        />
        <label htmlFor="">Image</label>
        <input
          // onChange={handleChange}
          type="file"
          name="profilePictureUrl"
          // value={dataUser.profilePictureUrl}
        />
        <label htmlFor="">Phone Number</label>
        <input
          onChange={handleChange}
          type="text"
          name="phoneNumber"
          value={dataUser.phoneNumber}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
