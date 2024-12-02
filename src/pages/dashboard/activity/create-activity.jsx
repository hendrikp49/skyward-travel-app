import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivityContext } from "@/contexts/activityContext";
import { CategoryContext } from "@/contexts/categoryContext";
import { IsOpenContext } from "@/contexts/isOpen";
import { CREATE_ACTIVITY } from "@/pages/api/activity";
import { BASE_URL, API_KEY } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateActivity = () => {
  const router = useRouter();
  const { dataCategory, handleDataCategory } = useContext(CategoryContext);
  const { handleDataActivity } = useContext(ActivityContext);
  const { isOpen } = useContext(IsOpenContext);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [dataActivity, setDataActivity] = useState({
    title: "",
    description: "",
    categoryId: "",
    province: "",
    city: "",
    imageUrls: [],
    facilities: "",
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
  });

  const handleChange = (e) => {
    setDataActivity({
      ...dataActivity,
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
      .catch((err) => console.log(err.response));
  };

  const handleDeleteBanner = () => {
    setUploadImage(null);
    setImage(null);

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
      title: dataActivity.title,
      description: dataActivity.description,
      categoryId: dataActivity.categoryId,
      province: dataActivity.province,
      city: dataActivity.city,
      imageUrls: [uploadImage],
      facilities: dataActivity.facilities,
      price: Number(dataActivity.price),
      price_discount: Number(dataActivity.price_discount),
      rating: Number(dataActivity.rating),
      total_reviews: Number(dataActivity.total_reviews),
    };

    axios
      .post(`${BASE_URL + CREATE_ACTIVITY}`, payload, config)
      .then((res) => {
        toast.success("Create Activity Successful", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleDataActivity();
        router.push("/dashboard/activity");
      })
      .catch((err) => console.log(err.response));
  };

  const dataInput = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Kuta Beach",
      change: handleChange,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Favorite place in Bali",
      change: handleChange,
    },
    {
      label: "Image Url",
      name: "imageUrls",
      type: "file",
      placeholder: "",
      change: handleChangeImage,
    },
    {
      label: "Category",
      name: "categoryId",
      change: handleChange,
    },
    {
      label: "Province",
      name: "province",
      type: "text",
      placeholder: "West Java",
      change: handleChange,
    },
    {
      label: "City",
      name: "city",
      type: "text",
      placeholder: "Jakarta",
      change: handleChange,
    },
    {
      label: "Facilities",
      name: "facilities",
      type: "text",
      placeholder: "Free wifi, Free parking, Free breakfast",
      change: handleChange,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "1.000.000",
      change: handleChange,
    },
    {
      label: "Discount Price",
      name: "price_discount",
      type: "number",
      placeholder: "500.000",
      change: handleChange,
    },
    {
      label: "Rating",
      name: "rating",
      type: "number",
      placeholder: "5",
      change: handleChange,
    },
    {
      label: "Total Reviews",
      name: "total_reviews",
      type: "number",
      placeholder: "150",
      change: handleChange,
    },
  ];

  useEffect(() => {
    handleDataCategory();
    handleDataActivity();
  }, []);

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <div className="flex md:h-screen lg:h-auto">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full font-poppins text-slate-800 overflow-auto ease-linear py-5 duration-300 `}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center underline text-slate-800 font-playfair-display underline-offset-8">
            Create Activity
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid max-w-sm grid-cols-1 gap-5 p-5 mx-auto border shadow-sm shadow-slate-400 md:max-w-lg rounded-xl"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={uploadImage}
                alt={uploadImage && dataActivity.title}
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
                {input.name === "categoryId" ? (
                  <select
                    onChange={input.change}
                    className="px-2 py-1 border rounded-lg text-slate-950"
                    name={input.name}
                  >
                    <option readOnly className="text-slate-300">
                      Select Category
                    </option>
                    {dataCategory.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : input.name === "imageUrls" ? (
                  <Input
                    id="file-input"
                    accept="image/*"
                    onChange={handleChangeImage}
                    className="px-2 py-1 bg-white rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
                  />
                ) : (
                  <input
                    onChange={input.change}
                    className="px-2 py-1 border rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="flex items-end justify-end">
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

export default CreateActivity;
