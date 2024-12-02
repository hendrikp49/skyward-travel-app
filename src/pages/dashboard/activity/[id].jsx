import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActivityContext } from "@/contexts/activityContext";
import { CategoryContext } from "@/contexts/categoryContext";
import { IsOpenContext } from "@/contexts/isOpen";
import { UPDATE_ACTIVITY } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailActivity = () => {
  const router = useRouter();
  const { dataCategory, handleDataCategory } = useContext(CategoryContext);
  const { dataActivity, handleDataActivity } = useContext(ActivityContext);
  const { isOpen } = useContext(IsOpenContext);
  const [activityId, setActivityId] = useState({});
  const [image, setImage] = useState(null);

  const handleActivityId = () => {
    setActivityId(dataActivity.find((item) => item.id === router.query.id));
  };

  const handleChange = (e) => {
    setActivityId({
      ...activityId,
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
        setActivityId({
          ...activityId,
          imageUrls: [res.data.url, ...activityId.imageUrls],
        });
      })
      .catch((err) => console.log(err.response));
  };

  const handleEditActivity = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      title: activityId.title,
      description: activityId.description,
      category: activityId.category,
      province: activityId.province,
      city: activityId.city,
      imageUrls: activityId.imageUrls,
      facilities: activityId.facilities,
      price: activityId.price,
      price_discount: activityId.price_discount,
      rating: activityId.rating,
      total_review: activityId.total_review,
    };

    axios
      .post(`${BASE_URL + UPDATE_ACTIVITY + router.query.id}`, payload, config)
      .then((res) => {
        toast.success("Update Data Successfully", {
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
      .catch((err) => console.log(err));
  };

  const dataInput = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Title Activity",
      change: handleChange,
      value: activityId?.title,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Description Activity",
      change: handleChange,
      value: activityId?.description,
    },
    {
      label: "Image Url",
      name: "imageUrls",
      type: "file",
      change: handleChangeImage,
    },
    {
      label: "Category",
      name: "categoryId",
      change: handleChange,
      value: activityId?.categoryId,
    },
    {
      label: "Province",
      name: "province",
      type: "text",
      placeholder: "Province Activity",
      change: handleChange,
      value: activityId?.province,
    },
    {
      label: "City",
      name: "city",
      type: "text",
      placeholder: "City Activity",
      change: handleChange,
      value: activityId?.city,
    },
    {
      label: "Facilities",
      name: "facilities",
      type: "text",
      placeholder: "Facilities Activity",
      change: handleChange,
      value: activityId?.facilities,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "0",
      change: handleChange,
      value: activityId?.price,
    },
    {
      label: "Discount Price",
      name: "price_discount",
      type: "number",
      placeholder: "0",
      change: handleChange,
      value: activityId?.price_discount,
    },
    {
      label: "Rating",
      name: "rating",
      type: "number",
      placeholder: "5",
      change: handleChange,
      value: activityId?.rating,
    },
    {
      label: "Total Reviews",
      name: "total_reviews",
      type: "number",
      placeholder: "Total Reviews",
      change: handleChange,
      value: activityId?.total_reviews,
    },
  ];

  useEffect(() => {
    if (router.query.id) {
      handleActivityId();
    }
    handleDataActivity();
    handleDataCategory();
  }, [router.query.id]);

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full font-poppins text-slate-800 overflow-auto py-5 ease-linear duration-300`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center underline text-slate-800 font-playfair-display underline-offset-8">
            Edit Activity
          </h1>

          <form
            onSubmit={handleEditActivity}
            className="grid max-w-sm grid-cols-1 gap-5 p-5 mx-auto border shadow-sm shadow-slate-400 md:max-w-lg rounded-xl"
          >
            {activityId?.imageUrls?.length > 0 && (
              <img
                src={activityId.imageUrls[0]}
                alt={activityId.title}
                className="object-cover w-full rounded-md h-44"
              />
            )}
            {dataInput.map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label htmlFor="name">{input.label}</label>
                {input.name === "categoryId" ? (
                  <select
                    onChange={input.change}
                    className="px-2 py-1 border rounded-lg text-slate-950"
                    name={input.name}
                    value={input.value}
                  >
                    <option disabled value="">
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
                    value={input.value}
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

export default DetailActivity;
