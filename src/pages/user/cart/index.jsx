import { CARTS, UPDATE_CART } from "@/pages/api/cart";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const Cart = () => {
  const [dataCart, setDataCart] = useState([]);

  const handleDataCart = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + CARTS}`, config)
      .then((res) => {
        console.log(res.data.data);
        setDataCart(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddQuantity = (id, action) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const itemCart = dataCart.find((item) => item.id === id);

    const updateQty =
      action === "add" ? itemCart.quantity + 1 : itemCart.quantity - 1;

    const payload = {
      quantity: updateQty,
    };
    axios
      .post(`${BASE_URL + UPDATE_CART + itemCart.id}`, payload, config)
      .then((res) => {
        console.log(res);
        setDataCart((prev) => {
          return prev.map((item) => {
            item.id === id ? { ...item, quantity: updateQty } : item;
          });
        });
      })
      .catch((err) => console.log(err));
  };

  // const addQuantity = (id) => {
  //   handleAddQuantity(id, "add");
  // };

  // const removeQuantity = (id) => {
  //   handleAddQuantity(id, "remove");
  // };

  useEffect(() => {
    handleDataCart();
  }, []);

  return (
    <div>
      {dataCart.map((data) => (
        <div key={data.id}>
          <img src={data.imageUrls} alt="" />
          <h1>{data.activity.title}</h1>
          {/* <button onClick={() => removeQuantity(data.id)}>-</button> */}
          <p>Qty: {data.quantity}</p>
          {/* <button onClick={() => addQuantity(data.id)}>+</button> */}
          <p>Price: Rp. {data.activity.price}</p>
          <p>Total: Rp. {data.activity.price * data.quantity}</p>
          <Link href={`/user/cart/${data.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cart;
