import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import { useRouter } from "next/router";
import { REGISTER } from "../api/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");
  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    profilePictureUrl: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setDataRegister({
      ...dataRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataRegister.password !== dataRegister.passwordRepeat) {
      setPasswordError("Passwords do not match");
      return;
    }

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
      .post(`${BASE_URL + REGISTER}`, payload, config)
      .then((res) => {
        toast.success("Register successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const dataInput = [
    {
      label: "Name",
      type: "text",
      name: "name",
      placeholder: "John Doe",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "example@mail.com",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "******",
    },
    {
      label: "Repeat Password",
      type: "password",
      name: "passwordRepeat",
      placeholder: "******",
    },
    {
      label: "Role",
      jenis: [
        {
          label: "Admin",
          value: "admin",
          type: "radio",
          name: "role",
        },
        {
          label: "User",
          value: "user",
          type: "radio",
          name: "role",
        },
      ],
    },
    {
      label: "Phone Number",
      type: "number",
      name: "phoneNumber",
      placeholder: "08123456789",
    },
  ];

  return (
    <div className="text-slate-100 font-raleway">
      <div className="relative flex items-center justify-center h-screen">
        <img
          src="/images/auth.jpg"
          alt="auth image"
          className="absolute top-0 left-0 object-cover w-full h-full -z-10"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md gap-5 bg-transparent border backdrop-blur-md p-7 rounded-xl"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold font-playfair-display">
              Register
            </h1>
            <p className="text-sm font-extralight">
              Welcome to Skyward! Let&apos;s create your account
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {dataInput.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label htmlFor="" className="font-medium">
                  {item.label}
                </label>
                {item.jenis ? (
                  <div className="flex items-center gap-2">
                    {item.jenis.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type={item.type}
                          name={item.name}
                          value={item.value}
                        />
                        <label htmlFor="">{item.label}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <input
                      className="px-3 py-1 text-sm border rounded-md text-slate-800 placeholder:text-sm"
                      onChange={handleChange}
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                    />
                    {passwordError && item.name === "passwordRepeat" && (
                      <p className="text-sm font-medium text-red-400">
                        {passwordError}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <p className="text-sm font-light text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-skyward-primary hover:text-skyward-primary/70"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    // <div>
    //   <div>
    //     <form onSubmit={handleSubmit}>
    //       <label htmlFor="">Name</label>
    //       <input onChange={handleChange} type="text" name="name" />
    //       <label htmlFor="">Email</label>
    //       <input onChange={handleChange} type="email" name="email" />
    //       <label htmlFor="">Password</label>
    //       <input onChange={handleChange} type="text" name="password" />
    //       <label htmlFor="">Confirm Password</label>
    //       <input onChange={handleChange} type="text" name="passwordRepeat" />
    //       <input
    //         onChange={handleChange}
    //         type="radio"
    //         id="user"
    //         name="role"
    //         value="user"
    //       />
    //       <label htmlFor="user">User</label>
    //       <input
    //         onChange={handleChange}
    //         type="radio"
    //         id="admin"
    //         name="role"
    //         value="admin"
    //       />
    //       <label htmlFor="admin">Admin</label>
    //       <label htmlFor="">Phone Number</label>
    //       <input onChange={handleChange} type="text" name="phoneNumber" />
    //       <button type="submit">Register</button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Register;
