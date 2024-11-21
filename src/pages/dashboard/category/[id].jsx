import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_ID, UPDATE_CATEGORY } from "@/pages/api/category";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailCategory = () => {
  const router = useRouter();
  const [image, setImage] = useState(null);
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
        setTimeout(() => {
          router.push("/dashboard/category");
        }, 2000);
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

      <main className="flex flex-col items-center justify-center w-full h-screen overflow-auto text-white font-raleway bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline font-playfair-display underline-offset-8">
            Edit Category
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm p-5 mx-auto space-y-3 border min-w-max rounded-xl"
          >
            <img
              src={dataCategory?.imageUrl}
              alt={dataCategory?.name}
              className="object-cover w-full rounded-md h-44"
            />
            {dataInput.map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label>{input.label}</label>
                {input.type === "file" ? (
                  <Input
                    onChange={handleChangeImage}
                    type={input.type}
                    className="bg-white rounded-lg text-slate-950"
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    className="px-2 py-1 rounded-lg text-slate-950"
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
    // <div>
    //   <img
    //     src={dataCategory.imageUrl}
    //     alt={dataCategory.name}
    //     className="w-24 aspect-square"
    //   />
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       onChange={handleChange}
    //       type="text"
    //       name="name"
    //       value={dataCategory.name}
    //       className="border"
    //     />
    //     <input
    //       onChange={handleChange}
    //       type="text"
    //       name="imageUrl"
    //       value={dataCategory.imageUrl}
    //       className="border"
    //     />
    //     <button type="submit">Save</button>
    //   </form>
    // </div>
  );
};

export default DetailCategory;
