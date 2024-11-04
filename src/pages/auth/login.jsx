import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: dataLogin.email,
      password: dataLogin.password,
    };

    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .post(`${BASE_URL}/api/v1/login`, payload, config)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("email", res.data.data.email);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input onChange={handleChange} type="email" name="email" />
          <label htmlFor="">Password</label>
          <input onChange={handleChange} type="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
