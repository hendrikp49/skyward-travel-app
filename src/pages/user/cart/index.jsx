import { DELETE_CART, UPDATE_CART } from "@/pages/api/cart";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/contexts/cartContext";
import { Button } from "@/components/ui/button";
import NavbarUser from "@/components/Layout/Navbar";
import { Trash2 } from "lucide-react";
import Footer from "@/components/Layout/Footer";
import { getCookie } from "cookies-next";
import { CREATE_TRANSACTION } from "@/pages/api/transaction";
import { PAYMENT_METHOD } from "@/pages/api/payment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Cart = () => {
  const { dataCart, handleDataCart } = useContext(CartContext);
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const router = useRouter();

  const [transaction, setTransaction] = useState({
    cartIds: selectedItems,
    paymentMethodId: "",
  });

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
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      })
      .catch((err) => console.log(err));
  };

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
      cartIds: selectedItems,
    });
  };

  const handleCreateTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      cartIds: selectedItems,
      paymentMethodId: transaction.paymentMethodId,
    };

    if (selectedItems.length === 0) {
      toast.warning("Please select at least 1 item", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    if (!payload.paymentMethodId) {
      toast.warning("Please select payment method", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

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
        router.push("/user/my-transaction");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Checkout Failed", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored",
        });
      });
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

  // Toggle individual item selection
  const handleItemSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Toggle all items selection
  const handleSelectAll = () => {
    if (selectedItems.length === dataCart.length) {
      // If all are selected, deselect all
      setSelectedItems([]);
    } else {
      // Select all item IDs
      setSelectedItems(dataCart.map((item) => item.id));
    }
  };

  // Calculate total for selected items
  const calculateSelectedTotal = () => {
    return dataCart
      .filter((item) => selectedItems.includes(item.id))
      .reduce(
        (acc, item) => acc + item.activity.price_discount * item.quantity,
        0
      );
  };

  useEffect(() => {
    handleDataCart();
    handlePaymentMethod();
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
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedItems.length === dataCart.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4"
                    />
                  </th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataCart.map((data) => (
                  <tr key={data.id} className="border-b">
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(data.id)}
                        onChange={() => handleItemSelect(data.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="flex items-center justify-center py-5">
                      <img
                        className="object-cover rounded-md w-14 aspect-square"
                        src={data.activity.imageUrls[0]}
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

          <div className="flex items-center justify-between px-3 py-5 text-white rounded-lg bg-skyward-primary">
            <div>
              <h2 className="space-x-2 text-2xl font-bold">
                Total{" "}
                <span className="text-sm font-normal">
                  {`(${selectedItems.length} of ${dataCart.length} Product)`}
                </span>
              </h2>
            </div>
            <div className="flex items-center justify-center gap-2 lg:gap-5">
              <div className="text-right">
                <p className="text-xs line-through text-black/30">
                  {`Rp. ${dataCart
                    .filter((item) => selectedItems.includes(item.id))
                    .reduce(
                      (acc, item) => acc + item.activity.price * item.quantity,
                      0
                    )
                    .toLocaleString("id")}`}
                </p>
                <span className="text-xl font-medium">
                  {`Rp. ${calculateSelectedTotal().toLocaleString("id")}`}
                </span>
              </div>
              <div>
                <Button
                  onClick={handleCreateTransaction}
                  disabled={selectedItems.length === 0}
                  variant={selectedItems.length > 0 ? "secondary" : "disabled"}
                >
                  Checkout
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
