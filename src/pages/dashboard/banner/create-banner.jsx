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
      .catch((err) => console.log(err.response));
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
        setTimeout(() => {
          handleDataBanner();
          router.push("/dashboard/banner");
        }, 2000);
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
        }  h-screen font-poppins text-slate-100 ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline font-playfair-display underline-offset-8">
            Create Banner
          </h1>

          <form
            onSubmit={createDataBanner}
            className="max-w-sm p-5 mx-auto space-y-3 border min-w-max rounded-xl"
          >
            {dataInput.map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label htmlFor="name">{input.label}</label>
                {input.type === "file" ? (
                  <Input
                    onChange={handleChangeImage}
                    className="px-2 py-1 rounded-lg"
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    className="px-2 py-1 rounded-lg text-slate-950"
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
