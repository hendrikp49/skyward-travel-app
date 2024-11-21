import { CARTS, DELETE_CART, UPDATE_CART } from "@/pages/api/cart";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartContext } from "@/contexts/cartContext";
import { Button } from "@/components/ui/button";
import NavbarUser from "@/components/Layout/Navbar";
import { Trash2 } from "lucide-react";
import Footer from "@/components/Layout/Footer";
import { getCookie } from "cookies-next";

const Cart = () => {
  const { dataCart, handleDataCart } = useContext(CartContext);

  const handleChangeQuantity = (id, action) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
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
        handleDataCart();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCart = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };
    axios
      .delete(`${BASE_URL + DELETE_CART + id}`, config)
      .then((res) => {
        handleDataCart();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDataCart();
  }, []);

  return (
    <div className="bg-zinc-50">
      <NavbarUser />

      <div className="mt-10">
        <div className="p-10 mx-auto space-y-10 overflow-auto bg-white border rounded-lg shadow-sm shadow-slate-400 md:max-w-3xl lg:max-w-6xl">
          <h1 className="text-2xl font-bold">My Cart</h1>

          <div>
            <table className="w-full">
              <thead className="border-b-2 rounded-lg border-slate-700">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataCart.map((data, index) => (
                  <tr key={data.id} className="border-b">
                    <td className="flex items-center justify-center py-5">
                      <img
                        className="object-cover rounded-md w-14 aspect-square"
                        src={data.activity.imageUrls}
                        alt={data.activity.title}
                      />
                    </td>
                    <td className="py-5 text-center">{data.activity.title}</td>
                    <td className="py-5 space-x-2 text-center">
                      <span className="text-xs line-through text-slate-400">
                        Rp. {data.activity.price?.toLocaleString("id")}
                      </span>
                      <span>
                        Rp. {data.activity.price_discount?.toLocaleString("id")}
                      </span>
                    </td>
                    <td className="space-x-2 text-center">
                      <button
                        className="border rounded-md w-7 aspect-square"
                        disabled={data.quantity === 1}
                        onClick={() => handleChangeQuantity(data.id, "remove")}
                      >
                        -
                      </button>
                      <p className="inline-block">{data.quantity}</p>
                      <button
                        className="border rounded-md w-7 aspect-square"
                        onClick={() => handleChangeQuantity(data.id, "add")}
                      >
                        +
                      </button>
                    </td>
                    <td className="py-5 text-center">
                      Rp.{" "}
                      {(
                        data.activity.price_discount * data.quantity
                      ).toLocaleString("id")}
                    </td>
                    <td className="py-5 text-center">
                      <button onClick={() => handleDeleteCart(data.id)}>
                        <Trash2 color="red" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-3 py-5 text-white rounded-lg bg-skyward-primary">
            <div>
              <h2 className="space-x-2 text-2xl font-bold">
                Total{" "}
                <span className="text-sm font-normal">
                  {`(${dataCart.length} Product)`}
                </span>
              </h2>
            </div>
            <div className="flex items-center justify-center gap-2 lg:gap-5">
              <div className="text-right">
                <p className="text-xs line-through text-black/30">
                  {`Rp. ${dataCart
                    .reduce(
                      (acc, item) => acc + item.activity.price * item.quantity,
                      0
                    )
                    .toLocaleString("id")}`}
                </p>
                <span className="text-xl font-medium">
                  {`Rp. ${dataCart
                    .reduce(
                      (acc, item) =>
                        acc + item.activity.price_discount * item.quantity,
                      0
                    )
                    .toLocaleString("id")}`}
                </span>
              </div>
              <div>
                <Link href="/user/cart/checkout">
                  <Button variant="secondary">Checkout</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
