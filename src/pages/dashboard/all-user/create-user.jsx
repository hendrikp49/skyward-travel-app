import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IsOpenContext } from "@/contexts/isOpen";
import { REGISTER } from "@/pages/api/auth";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Eye, EyeClosed, X } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
  const router = useRouter();
  const { isOpen } = useContext(IsOpenContext);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
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

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(`${BASE_URL + UPLOAD}`, formData, config)
      .then((res) => {
        setUploadImage(res.data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteImage = () => {
    setUploadImage(null);
    setImage(null);

    document.getElementById("file-input").value = "";
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
      profilePictureUrl: uploadImage,
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
        toast.success("Create User successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/dashboard/all-user");
      })
      .catch((err) => console.log(err.response));
  };

  const dataInput = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "email@example.com",
    },
    {
      name: "profilePictureUrl",
      label: "Profile Picture",
      type: "file",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "******",
    },
    {
      name: "passwordRepeat",
      label: "Repeat Password",
      type: "password",
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
      name: "phoneNumber",
      label: "Phone Number",
      type: "number",
      placeholder: "08123456789",
    },
  ];

  useEffect(() => {
    handleUploadImage();
  }, [image]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center self-end justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full min-h-screen font-poppins py-5 text-slate-800 overflow-auto ease-linear duration-300 `}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center underline text-slate-800 font-playfair-display underline-offset-8">
            Create User
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm p-5 mx-auto space-y-3 border shadow-sm shadow-slate-400 min-w-max rounded-xl"
          >
            <div className="relative mx-auto overflow-hidden w-fit">
              <img
                src={uploadImage}
                alt={uploadImage && dataRegister.name}
                className={`object-cover ${
                  !uploadImage && "bg-slate-300"
                } h-32 mx-auto w-full rounded-lg aspect-square`}
              />
              <p
                className={`absolute text-sm text-center text-slate-800 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                  uploadImage && "hidden"
                }`}
              >
                Preview Image
              </p>
              <div
                onClick={handleDeleteImage}
                className={`absolute ${
                  !uploadImage && "hidden"
                } p-1 bg-red-500 rounded-full active:scale-90 ease-in-out duration-300 cursor-pointer top-1 right-1`}
              >
                <X size={12} color="white" />
              </div>
            </div>
            {dataInput.map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="font-medium">{input.label}</label>
                {input.type === "file" ? (
                  <Input
                    id="file-input"
                    accept="image/*"
                    onChange={handleChangeImage}
                    className="px-2 py-1 bg-white rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
                  />
                ) : input.jenis ? (
                  <div className="flex items-center gap-2">
                    {input.jenis.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type={item.type}
                          name={item.name}
                          value={item.value}
                          onChange={handleChange}
                        />
                        <label htmlFor="">{item.label}</label>
                      </div>
                    ))}
                  </div>
                ) : input.name === "password" ? (
                  <div className="relative">
                    <input
                      className="w-full py-1 pl-3 pr-10 text-sm border rounded-md text-slate-800 placeholder:text-sm"
                      onChange={handleChange}
                      type={showPassword ? "text" : input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                    />
                    {showPassword ? (
                      <Eye
                        onClick={() => setShowPassword(!showPassword)}
                        size={20}
                        color="#64748b"
                        className="absolute cursor-pointer top-1 right-2"
                      />
                    ) : (
                      <EyeClosed
                        onClick={() => setShowPassword(!showPassword)}
                        size={20}
                        color="#64748b"
                        className="absolute cursor-pointer top-1 right-2"
                      />
                    )}
                  </div>
                ) : input.name === "passwordRepeat" ? (
                  <div className="relative">
                    <input
                      className="w-full py-1 pl-3 pr-10 text-sm border rounded-md text-slate-800 placeholder:text-sm"
                      onChange={handleChange}
                      type={showPasswordRepeat ? "text" : input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                    />
                    {showPasswordRepeat ? (
                      <Eye
                        onClick={() =>
                          setShowPasswordRepeat(!showPasswordRepeat)
                        }
                        size={20}
                        color="#64748b"
                        className="absolute cursor-pointer top-1 right-2"
                      />
                    ) : (
                      <EyeClosed
                        onClick={() =>
                          setShowPasswordRepeat(!showPasswordRepeat)
                        }
                        size={20}
                        color="#64748b"
                        className="absolute cursor-pointer top-1 right-2"
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <input
                      onChange={handleChange}
                      className="px-2 py-1 border rounded-lg text-slate-950"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                    />
                    {passwordError && input.name === "passwordRepeat" && (
                      <p className="text-sm font-medium text-red-400">
                        {passwordError}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateUser;
