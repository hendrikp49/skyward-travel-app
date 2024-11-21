import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BannerContext } from "@/contexts/bannerContext";
import { BANNER_ID, UPDATE_BANNER } from "@/pages/api/banner";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailBanner = () => {
  const { dataBanner, handleDataBanner } = useContext(BannerContext);
  const [bannerId, setBannerId] = useState({});
  const [image, setImage] = useState(null);
  const router = useRouter();
  const dataInput = [
    {
      name: "name",
      type: "text",
      label: "Name",
      value: bannerId?.name,
    },
    {
      name: "imageUrl",
      type: "file",
      label: "Image URL",
    },
  ];

  const handleBannerId = () => {
    setBannerId(dataBanner.find((item) => item.id === router.query.id));
  };

  const handleChange = (e) => {
    setBannerId({
      ...bannerId,
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
        setBannerId({ ...bannerId, imageUrl: res.data.url });
      })
      .catch((err) => console.log(err.response));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      name: bannerId.name,
      imageUrl: bannerId.imageUrl,
    };

    axios
      .post(`${BASE_URL + UPDATE_BANNER + router.query.id}`, payload, config)
      .then((res) => {
        toast.success("Data updated successfully", {
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
    if (router.query.id) {
      handleBannerId();
    }
    handleDataBanner();
  }, [router.query.id]);

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen text-white font-raleway bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline font-playfair-display underline-offset-8">
            Edit Banner
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm p-5 mx-auto space-y-3 border min-w-max rounded-xl"
          >
            <img
              src={bannerId?.imageUrl}
              alt={bannerId?.name}
              className="object-cover w-full rounded-md h-44"
            />
            {dataInput.map((input) => (
              <div className="flex flex-col gap-1">
                <label>{input.label}</label>
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
                    value={input.value}
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

export default DetailBanner;
