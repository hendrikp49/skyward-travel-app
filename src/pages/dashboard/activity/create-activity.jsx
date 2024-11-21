import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivityContext } from "@/contexts/activityContext";
import { CategoryContext } from "@/contexts/categoryContext";
import { CREATE_ACTIVITY } from "@/pages/api/activity";
import { BASE_URL, API_KEY } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateActivity = () => {
  const router = useRouter();
  const { dataCategory, handleDataCategory } = useContext(CategoryContext);
  const { handleDataActivity } = useContext(ActivityContext);
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
        setTimeout(() => {
          handleDataActivity();
          router.push("/dashboard/activity");
        }, 2000);
      })
      .catch((err) => console.log(err.response));
  };

  const dataInput = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Title Activity",
      change: handleChange,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Description Activity",
      change: handleChange,
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
      placeholder: "Province Activity",
      change: handleChange,
    },
    {
      label: "City",
      name: "city",
      type: "text",
      placeholder: "City Activity",
      change: handleChange,
    },
    {
      label: "Facilities",
      name: "facilities",
      type: "text",
      placeholder: "Facilities Activity",
      change: handleChange,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "0",
      change: handleChange,
    },
    {
      label: "Discount Price",
      name: "price_discount",
      type: "number",
      placeholder: "0",
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
      placeholder: "Total Reviews",
      change: handleChange,
    },
    {
      label: "Image Url",
      name: "imageUrls",
      type: "file",
      placeholder: "",
      change: handleChangeImage,
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
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen pb-5 overflow-auto text-white font-raleway bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline font-playfair-display underline-offset-8">
            Create Activity
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid max-w-sm grid-cols-2 gap-5 p-5 mx-auto border min-w-max rounded-xl"
          >
            {dataInput.map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label htmlFor="name">{input.label}</label>
                {input.name === "categoryId" ? (
                  <select
                    onChange={input.change}
                    className="px-2 py-1 rounded-lg text-slate-950"
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
                    onChange={handleChangeImage}
                    className="px-2 py-1 bg-white rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
                  />
                ) : (
                  <input
                    onChange={input.change}
                    className="px-2 py-1 rounded-lg text-slate-950"
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
