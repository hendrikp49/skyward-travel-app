import { CARTS, UPDATE_CART } from "@/pages/api/cart";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditQty = () => {
  const [dataActivity, setDataActivity] = useState({});
  const router = useRouter();

  const handleDataCart = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + CARTS}`, config)
      .then((res) => {
        setDataActivity(
          res.data.data.find((item) => item.id === router.query.id)
        );
      })
      .catch((err) => console.log(err));
  };

  const addQuantity = () => {
    setDataActivity({
      ...dataActivity,
      quantity: dataActivity.quantity + 1,
    });
  };

  const removeQuantity = () => {
    setDataActivity({
      ...dataActivity,
      quantity: dataActivity.quantity - 1,
    });
  };

  const handleAddQuantity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      quantity: dataActivity.quantity,
    };

    axios
      .post(`${BASE_URL + UPDATE_CART + router.query.id}`, payload, config)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          router.push("/user/cart");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (router.query.id) {
      handleDataCart();
    }
  }, [router.query.id]);

  return (
    <div>
      <h1>Quantity</h1>
      <button onClick={removeQuantity}>-</button>
      <p>{dataActivity.quantity}</p>
      <button onClick={addQuantity}>+</button>
      <button className="block" onClick={handleAddQuantity}>
        Edit
      </button>
    </div>
  );
};

export default EditQty;
