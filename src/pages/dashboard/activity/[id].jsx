import { ACTIVITY_ID, UPDATE_ACTIVITY } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailActivity = () => {
  const router = useRouter();

  const [dataActivity, setDataActivity] = useState({});

  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ACTIVITY_ID + router.query.id}`, config)
      .then((res) => setDataActivity(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setDataActivity({
      ...dataActivity,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditActivity = (e) => {
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
      category: dataActivity.category,
      province: dataActivity.province,
      city: dataActivity.city,
      imageUrls: dataActivity.imageUrls,
      facilities: dataActivity.facilities,
      price: dataActivity.price,
      price_discount: dataActivity.price_discount,
      rating: dataActivity.rating,
      total_review: dataActivity.total_review,
    };

    axios
      .post(`${BASE_URL + UPDATE_ACTIVITY + router.query.id}`, payload, config)
      .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          router.push("/dashboard/activity");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    {
      router.query.id && handleDataActivity();
    }
  }, [router.query.id]);

  return (
    <div>
      <img
        src={dataActivity.imageUrls[dataActivity.imageUrls.length - 1]}
        alt={dataActivity.title}
      />
      <form onSubmit={handleEditActivity}>
        <input
          className="block border"
          type="text"
          name="title"
          value={dataActivity.title}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="description"
          value={dataActivity.description}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="category"
          value={dataActivity.category}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="province"
          value={dataActivity.province}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="city"
          value={dataActivity.city}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="facilities"
          value={dataActivity.facilities}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="price"
          value={dataActivity.price}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="price_discount"
          value={dataActivity.price_discount}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="rating"
          value={dataActivity.rating}
          onChange={handleChange}
        />
        <input
          className="block border"
          type="text"
          name="total_reviews"
          value={dataActivity.total_reviews}
          onChange={handleChange}
        />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default DetailActivity;
