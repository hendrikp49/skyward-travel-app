import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    profilePictureUrl: "",
    phoneNumber: "",
  });

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles change event of input elements in the register form.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   * @returns {void} - Nothing.
   */
  /******  a063a9a9-126d-43db-bdb6-5797e980b0c5  *******/ const handleChange = (
    e
  ) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: dataRegister.name,
      email: dataRegister.email,
      password: dataRegister.password,
      passwordRepeat: dataRegister.passwordRepeat,
      role: dataRegister.role,
      profilePictureUrl: dataRegister.profilePictureUrl,
      phoneNumber: dataRegister.phoneNumber,
    };

    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .post(`${BASE_URL}/api/v1/register`, payload, config)
      .then((res) => {
        alert("Register Success");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input onChange={handleChange} type="text" name="name" />
          <label htmlFor="">Email</label>
          <input onChange={handleChange} type="email" name="email" />
          <label htmlFor="">Password</label>
          <input onChange={handleChange} type="text" name="password" />
          <label htmlFor="">Confirm Password</label>
          <input onChange={handleChange} type="text" name="passwordRepeat" />
          <input
            onChange={handleChange}
            type="radio"
            id="user"
            name="role"
            value="user"
          />
          <label htmlFor="user">User</label>
          <input
            onChange={handleChange}
            type="radio"
            id="admin"
            name="role"
            value="admin"
          />
          <label htmlFor="admin">Admin</label>
          <label htmlFor="">Phone Number</label>
          <input onChange={handleChange} type="text" name="phoneNumber" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
