import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IsOpenContext } from "@/contexts/isOpen";
import { CATEGORY_ID, UPDATE_CATEGORY } from "@/pages/api/category";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailCategory = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const { isOpen } = useContext(IsOpenContext);
  const [dataCategory, setDataCategory] = useState({
    name: "",
    imageUrl: "",
  });

  const handleDataCategory = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + CATEGORY_ID + router.query.id}`, config)
      .then((res) => setDataCategory(res.data.data))
      .catch((err) => console.log(err.response));
  };

  const handleChange = (e) => {
    setDataCategory({
      ...dataCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDataImage = () => {
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
        setDataCategory({
          ...dataCategory,
          imageUrl: res.data.url,
        });
      })
      .catch((err) => console.log(err.response));
  };

  const handleDeleteBanner = () => {
    setDataCategory({ ...dataCategory, imageUrl: "" });

    document.getElementById("file-input").value = "";
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
      name: dataCategory.name,
      imageUrl: dataCategory.imageUrl,
    };

    axios
      .post(`${BASE_URL + UPDATE_CATEGORY + router.query.id}`, payload, config)
      .then((res) => {
        toast.success("Data Category updated successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        router.push("/dashboard/category");
      })
      .catch((err) => console.log(err.response));
  };

  const dataInput = [
    {
      name: "name",
      type: "text",
      label: "Category Name",
      value: dataCategory.name,
    },
    {
      type: "file",
      label: "Image URL",
    },
  ];

  useEffect(() => {
    if (router.query.id) {
      handleDataCategory();
    }
  }, [router.query.id]);

  useEffect(() => {
    if (image) {
      handleDataImage();
    }
  }, [image]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full min-h-screen font-poppins text-slate-800 py-2 ease-linear duration-300 `}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center underline text-slate-800 font-playfair-display underline-offset-8">
            Edit Category
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm p-5 mx-auto space-y-3 border shadow-sm shadow-slate-400 rounded-xl"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={dataCategory?.imageUrl}
                alt={dataCategory?.imageUrl && dataCategory?.name}
                className={`object-cover w-full rounded-md h-44 ${
                  !dataCategory?.imageUrl && "bg-slate-400"
                }`}
              />
              <p
                className={`absolute text-slate-800 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                  dataCategory?.imageUrl && "hidden"
                }`}
              >
                Preview Image
              </p>
              <div
                onClick={handleDeleteBanner}
                className={`absolute ${
                  !dataCategory?.imageUrl && "hidden"
                } p-1 bg-red-500 rounded-full active:scale-90 ease-in-out duration-300 cursor-pointer top-2 right-2`}
              >
                <X size={16} color="white" />
              </div>
            </div>

            {dataInput.map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label>{input.label}</label>
                {input.type === "file" ? (
                  <Input
                    id="file-input"
                    accept="image/*"
                    onChange={handleChangeImage}
                    type={input.type}
                    className="bg-white rounded-lg text-slate-950"
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    className="px-2 py-1 border rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
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

export default DetailCategory;
