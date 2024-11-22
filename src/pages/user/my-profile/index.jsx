import axios from "axios";
import { useEffect, useState } from "react";
import { LOGGED_USER, UPDATE_USER } from "../../api/user";
import { API_KEY, BASE_URL } from "../../api/config";
import Image from "next/image";
import NavbarUser from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UPLOAD } from "@/pages/api/upload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";

const User = () => {
  const [dataUser, setDataUser] = useState({});
  const [image, setImage] = useState(null);

  const handleUser = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
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

  const handleChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUploadImage = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = new FormData();
    payload.append("image", image);

    axios
      .post(`${BASE_URL + UPLOAD}`, payload, config)
      .then((res) => {
        setDataUser({
          ...dataUser,
          profilePictureUrl: res.data.url,
        });
      })
      .catch((err) => console.log(err));
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
      .then((res) => {
        toast.success("Update Successful", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleUser();
      })
      .catch((err) => console.log(err));
  };

  const dataInput = [
    {
      id: 1,
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "John Doe",
      value: dataUser.name,
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@mail.com",
      value: dataUser.email,
    },
    {
      id: 3,
      label: "Role",
      name: "role",
      type: "text",
      placeholder: "Your Role",
      value: dataUser.role,
    },
    {
      id: 4,
      label: "Phone Number",
      name: "phoneNumber",
      type: "number",
      placeholder: "08123456789",
      value: dataUser.phoneNumber,
    },
  ];

  useEffect(() => {
    handleUser();
  }, []);

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <div className="font-raleway bg-zinc-50">
      <NavbarUser />

      <div className="mt-20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center max-w-sm gap-10 px-5 py-3 mx-auto bg-white border shadow-sm md:grid md:items-start md:grid-cols-2 md:max-w-3xl rounded-xl shadow-slate-600"
        >
          <div className="flex flex-col items-center gap-3">
            <img
              src={dataUser.profilePictureUrl}
              alt={dataUser.name}
              className="object-cover w-32 rounded-lg aspect-square"
            />
            <Input
              type="file"
              onChange={handleChangeImage}
              className="cursor-pointer"
            />
          </div>

          <div className="w-full space-y-3 md:space-y-6">
            {dataInput.map((item) => (
              <div key={item.id} className="flex flex-col gap-1">
                <label htmlFor="" className="font-medium">
                  {item.label}
                </label>
                <input
                  disabled={item.name === "role"}
                  type={item.type}
                  name={item.name}
                  value={item.value}
                  onChange={handleChange}
                  className="px-3 py-1 border-b text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-100"
                />
              </div>
            ))}
          </div>
          <div className="self-end w-full col-span-2 text-right">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default User;
