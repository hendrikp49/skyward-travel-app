import { useEffect, useState } from "react";
import { ALL_USER, UPDATE_ROLE } from "../../api/user";
import { API_KEY, BASE_URL } from "../../api/config";
import axios from "axios";
import { useRouter } from "next/router";

const UpdateRole = () => {
  const router = useRouter();
  const [roleUser, setRoleUser] = useState([]);

  const handleUser = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .get(`${BASE_URL + ALL_USER}`, config)
      .then((res) => {
        setRoleUser(res.data.data.find((user) => user.id === router.query.id));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setRoleUser({
      ...roleUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      role: roleUser.role,
    };

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .post(`${BASE_URL + UPDATE_ROLE + router.query.id}`, payload, config)
      .then((res) => {
        alert("Update Success");
        setTimeout(() => {
          router.push("/dashboard/all-user");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div>
      <div>update role</div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          checked={roleUser.role === "user"}
          type="radio"
          name="role"
          id="user"
          value="user"
        />
        <label htmlFor="admin">user</label>
        <input
          onChange={handleChange}
          checked={roleUser.role === "admin"}
          type="radio"
          name="role"
          id="admin"
          value="admin"
        />
        <label htmlFor="">admin</label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRole;
