import { ACTIVITY_ID } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ADD_TO_CART } from "../api/cart";

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

  const handleAddToCart = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      activityId: dataActivity.id,
    };

    axios
      .post(`${BASE_URL + ADD_TO_CART}`, payload, config)
      .then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          router.push("/activity");
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
      <img src={dataActivity.imageUrls} alt="" className="w-24 aspect-square" />
      <h1>{dataActivity.title}</h1>
      <p>{dataActivity.description}</p>
      <button onClick={handleAddToCart} className="block">
        Add to Cart
      </button>
    </div>
  );
};

export default DetailActivity;
