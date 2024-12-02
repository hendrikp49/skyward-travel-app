import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BannerContext } from "@/contexts/bannerContext";
import { IsOpenContext } from "@/contexts/isOpen";
import { CREATE_BANNER } from "@/pages/api/banner";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBanner = () => {
  const router = useRouter();
  const { isOpen } = useContext(IsOpenContext);
  const { handleDataBanner } = useContext(BannerContext);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [createBanner, setCreateBanner] = useState({
    name: "",
    imageUrl: "",
  });
  const dataInput = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Banner Name",
    },
    {
      name: "imageUrl",
      type: "file",
      label: "Image URL",
      placeholder: "Image URL",
    },
  ];

  const handleChange = (e) => {
    setCreateBanner({
      ...createBanner,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleUploadImage = (e) => {
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
      .catch((err) =>
        toast.error(err.response, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      );
  };

  const handleDeleteBanner = () => {
    setUploadImage(null);
    setImage(null);

    document.getElementById("file-input").value = "";
  };

  const createDataBanner = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      name: createBanner.name,
      imageUrl: uploadImage,
    };

    axios
      .post(`${BASE_URL + CREATE_BANNER}`, payload, config)
      .then((res) => {
        toast.success("Create Banner successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleDataBanner();
        router.push("/dashboard/banner");
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center self-end justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full min-h-screen font-poppins text-slate-800 overflow-auto ease-linear duration-300 `}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center underline text-slate-800 font-playfair-display underline-offset-8">
            Create Banner
          </h1>

          <form
            onSubmit={createDataBanner}
            className="max-w-sm p-5 mx-auto space-y-3 border shadow-sm shadow-slate-400 min-w-max rounded-xl"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={uploadImage}
                alt={uploadImage && createBanner.name}
                className={`object-cover w-full rounded-md h-44 ${
                  !uploadImage && "bg-slate-400"
                }`}
              />
              <p
                className={`absolute text-slate-800 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                  uploadImage && "hidden"
                }`}
              >
                Preview Image
              </p>
              <div
                onClick={handleDeleteBanner}
                className={`absolute ${
                  !uploadImage && "hidden"
                } p-1 bg-red-500 rounded-full active:scale-90 ease-in-out duration-300 cursor-pointer top-2 right-2`}
              >
                <X size={16} color="white" />
              </div>
            </div>
            {dataInput.map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label htmlFor="name">{input.label}</label>
                {input.type === "file" ? (
                  <Input
                    id="file-input"
                    onChange={handleChangeImage}
                    className="px-2 py-1 bg-white rounded-lg text-slate-950"
                    type={input.type}
                    accept="image/*"
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    className="px-2 py-1 border rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <Button variant="secondary" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateBanner;
