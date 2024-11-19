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
import { CREATE_TRANSACTION } from "@/pages/api/transaction";
import { PAYMENT_METHOD } from "@/pages/api/payment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Cart = () => {
  const router = useRouter();
  const { dataCart, handleDataCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [transaction, setTransaction] = useState({
    cartIds: [],
    paymentMethodId: "",
  });

  const handlePaymentMethod = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };
    axios
      .get(`${BASE_URL + PAYMENT_METHOD}`, config)
      .then((res) => {
        setPaymentMethod(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setTransaction({
      ...transaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      cartIds: dataCart.map((item) => item.id),
      paymentMethodId: transaction.paymentMethodId,
    };

    axios
      .post(`${BASE_URL + CREATE_TRANSACTION}`, payload, config)
      .then((res) => {
        toast.success("Checkout Success", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/user/my-transaction");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDataCart();
    handlePaymentMethod();
  }, []);

  return (
    <div className="bg-zinc-50 font-raleway">
      <NavbarUser />

      <div className="mt-10">
        <div className="p-10 mx-auto space-y-10 overflow-auto bg-white border rounded-lg shadow-sm lg:space-y-20 shadow-slate-400 md:max-w-xl lg:max-w-3xl">
          <h1 className="text-2xl font-bold font-playfair-display">
            My Cart / Checkout
          </h1>

          <div>
            <table className="w-full">
              <thead className="border-b-2 rounded-lg border-slate-700">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {dataCart.map((data, index) => (
                  <tr key={data.id} className="border-b">
                    <td className="py-5 text-center">{data.activity.title}</td>
                    <td className="py-5 space-x-2 text-center">
                      <span>
                        Rp. {data.activity.price_discount?.toLocaleString("id")}
                      </span>
                    </td>
                    <td className="space-x-2 text-center">
                      <p className="inline-block">{data.quantity}</p>
                    </td>
                    <td className="py-5 text-center">
                      Rp.{" "}
                      {(
                        data.activity.price_discount * data.quantity
                      ).toLocaleString("id")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-10">
            <h2 className="text-2xl font-bold font-playfair-display">
              Choose Payment
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {paymentMethod.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="paymentMethodId"
                    value={data.id}
                    onChange={handleChange}
                  />
                  <div className="flex items-center space-x-2">
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="aspect-square h-14"
                    />
                    <span>{data.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr />

          <div className="flex items-center justify-between px-3 py-5 text-white rounded-lg bg-gradient-to-br from-skyward-secondary to-fuchsia-500">
            <div>
              <h2 className="space-x-2 text-2xl font-bold">Total</h2>
            </div>
            <div className="flex items-center justify-center gap-2 lg:gap-5">
              <div className="text-right">
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
                <Button onClick={handleCreateTransaction}>
                  Create Payment
                </Button>
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
