import { CATEGORY_ID, UPDATE_CATEGORY } from "@/pages/api/category";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailCategory = () => {
  const router = useRouter();
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

  const handleSubmit = (e) => {
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
      .post(`${BASE_URL + UPDATE_CATEGORY + router.query.id}`, payload, config)
      .then((res) => {
        alert("Update Success");
        setTimeout(() => {
          router.push("/dashboard/category");
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (router.query.id) {
      handleDataCategory();
    }
  }, [router.query.id]);

  return (
    <div>
      <img
        src={dataCategory.imageUrl}
        alt={dataCategory.name}
        className="w-24 aspect-square"
      />
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={dataCategory.name}
          className="border"
        />
        <input
          onChange={handleChange}
          type="text"
          name="imageUrl"
          value={dataCategory.imageUrl}
          className="border"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DetailCategory;
