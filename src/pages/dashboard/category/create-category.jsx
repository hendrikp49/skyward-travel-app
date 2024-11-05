import { CREATE_CATEGORY } from "@/pages/api/category";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateBanner = () => {
  const router = useRouter();
  const [dataCategory, setDataCategory] = useState({
    name: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setDataCategory({
      ...dataCategory,
      [e.target.name]: e.target.value,
    });
  };

  const createDataCategory = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      name: dataCategory.name,
      imageUrl: dataCategory.imageUrl,
    };

    axios
      .post(`${BASE_URL + CREATE_CATEGORY}`, payload, config)
      .then((res) => {
        alert("Create Success");
        setTimeout(() => {
          router.push("/dashboard/category");
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <form onSubmit={createDataCategory}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="imageUrl"
          placeholder="imageUrl"
        />
        <button type="submit">Submit</button>
      </form>
      <h1></h1>
    </div>
  );
};

export default CreateBanner;
