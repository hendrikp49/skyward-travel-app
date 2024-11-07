import { ACTIVITY_ID, UPDATE_ACTIVITY } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailActivity = () => {
  const router = useRouter();

  const [dataActivity, setDataActivity] = useState({});
  const [quantity, setQuantity] = useState(1);

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

  const handleButtonPlus = () => {
    setQuantity(quantity + 1);
  };

  const handleButtonMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    {
      router.query.id && handleDataActivity();
    }
  }, [router.query.id]);

  return (
    <div>
      <img src={dataActivity.imageUrls} alt="" className="w-24 aspect-square" />
      <h1>{dataActivity.title}</h1>
      <p>{dataActivity.description}</p>
      <button onClick={handleButtonMinus}>-</button>
      <span>{quantity}</span>
      <button onClick={handleButtonPlus}>+</button>
      <button className="block">Add to Cart</button>
    </div>
  );
};

export default DetailActivity;
