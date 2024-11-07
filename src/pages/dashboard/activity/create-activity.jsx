import { CREATE_ACTIVITY } from "@/pages/api/activity";
import { BASE_URL, API_KEY } from "@/pages/api/config";
import axios from "axios";
import { useState } from "react";

const CreateActivity = () => {
  const [dataActivity, setDataActivity] = useState({
    title: "",
    description: "",
    categoryId: "",
    province: "",
    city: "",
    imageUrls: [""],
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
    setDataActivity({
      ...dataActivity,
      imageUrls: [...dataActivity.imageUrls, e.target.value],
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
      title: dataActivity.title,
      description: dataActivity.description,
      categoryId: dataActivity.categoryId,
      province: dataActivity.province,
      city: dataActivity.city,
      imageUrls: dataActivity.imageUrls,
      facilities: dataActivity.facilities,
      price: Number(dataActivity.price),
      price_discount: Number(dataActivity.price_discount),
      rating: Number(dataActivity.rating),
      total_reviews: Number(dataActivity.total_reviews),
    };

    axios
      .post(`${BASE_URL + CREATE_ACTIVITY}`, payload, config)
      .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          router.push("/dashboard/activity");
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="block border"
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="category"
          placeholder="category"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="province"
          placeholder="province"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="city"
          placeholder="city"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="imageUrls"
          placeholder="imageUrls"
          onChange={handleChangeImage}
        />
        <input
          className="block border"
          type="text"
          name="facilities"
          placeholder="facilities"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="price"
          placeholder="price"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="price_discount"
          placeholder="price_discount"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="rating"
          placeholder="rating"
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="total_reviews"
          placeholder="total_reviews"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateActivity;
