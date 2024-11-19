import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { BannerContext } from "@/contexts/bannerContext";
import { BANNER_ID, UPDATE_BANNER } from "@/pages/api/banner";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailBanner = () => {
  const { dataBanner, handleDataBanner } = useContext(BannerContext);
  const [bannerId, setBannerId] = useState({});
  const router = useRouter();
  const dataInput = [
    {
      name: "name",
      type: "text",
      label: "Name",
      value: bannerId.name,
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Image URL",
      value: bannerId.imageUrl,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, [router.query.id]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen text-white bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline underline-offset-8">
            Edit Banner
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm p-5 mx-auto space-y-3 border rounded-xl"
          >
            {dataInput.map((input) => (
              <div className="flex flex-col gap-1">
                <label>{input.label}</label>
                <input
                  onChange={handleChange}
                  className="px-2 py-1 rounded-lg text-slate-950"
                  type={input.type}
                  name={input.name}
                  value={input.value}
                />
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
