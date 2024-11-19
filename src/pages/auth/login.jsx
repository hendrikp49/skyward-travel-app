import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { LOGIN } from "../api/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";

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
      .post(`${BASE_URL + LOGIN}`, payload, config)
      .then((res) => {
        toast.success("Login successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(res);
        setCookie("token", res.data.token);
        setCookie("role", res.data.data.role);
        setCookie("idUser", res.data.data.id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("email", res.data.data.email);
        setCookie("image", res.data.data.profilePictureUrl);
        setTimeout(() => {
          if (res.data.data.role === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
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
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@mail.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "******",
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
          className="flex flex-col w-full max-w-xs gap-5 bg-transparent border backdrop-blur-md p-7 rounded-xl"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold font-playfair-display">Login</h1>
            <p className="text-sm font-extralight">
              Please login to your account
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {dataInput.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label htmlFor="" className="font-medium">
                  {item.label}
                </label>
                <input
                  className="px-3 py-1 text-sm border rounded-md text-slate-800 placeholder:text-sm"
                  onChange={handleChange}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-sm font-light text-center">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-skyward-primary hover:text-skyward-primary/70"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
