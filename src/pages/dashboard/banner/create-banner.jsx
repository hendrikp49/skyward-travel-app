import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { BannerContext } from "@/contexts/bannerContext";
import { CREATE_BANNER } from "@/pages/api/banner";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBanner = () => {
  const { handleDataBanner } = useContext(BannerContext);
  const router = useRouter();
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
      type: "text",
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

  const createDataBanner = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      name: createBanner.name,
      imageUrl: createBanner.imageUrl,
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

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen text-white bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline underline-offset-8">
            Create Banner
          </h1>

          <form
            onSubmit={createDataBanner}
            className="max-w-sm p-5 mx-auto space-y-3 border rounded-xl"
          >
            {dataInput.map((input) => (
              <div className="flex flex-col gap-1">
                <label htmlFor="name">{input.label}</label>
                <input
                  onChange={handleChange}
                  className="px-2 py-1 rounded-lg text-slate-950"
                  type={input.type}
                  name={input.name}
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

export default CreateBanner;
