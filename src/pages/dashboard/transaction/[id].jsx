// import dynamic from "next/dynamic";
import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import {
  CANCEL_TRANSACTION,
  TRANSACTION_ID,
  UPDATE_TRANSACTION_STATUS,
} from "@/pages/api/transaction";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailTransaction = () => {
  const router = useRouter();
  const [dataTransaction, setDataTransaction] = useState({});
  const [dataStatus, setDataStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // const Dialog = dynamic(() => import("@/components/ui/dialog"), {
  //   ssr: false,
  // });

  const handleDataTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + TRANSACTION_ID + router.query.id}`, config)
      .then((res) => {
        setDataTransaction(res.data.data);
        setDataStatus(res.data.data.status);
      })
      .catch((err) => console.log(err.response));
  };

  const dataInput = [
    {
      label: "Invoice No.",
      value: dataTransaction.invoiceId,
    },
    {
      label: "Order Date",
      value: new Date(dataTransaction.orderDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    {
      label: "Expired Date",
      value: new Date(dataTransaction.expiredDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    {
      label: "Payment Method",
      value: dataTransaction.payment_method?.imageUrl,
    },
    {
      label: "VA Number",
      value: dataTransaction.payment_method?.virtual_account_number,
    },
    {
      label: "VA Name",
      value: dataTransaction.payment_method?.virtual_account_name,
    },
    {
      label: "Total Price",
      value: dataTransaction.transaction_items
        ?.reduce((acc, item) => acc + item.price_discount * item.quantity, 0)
        .toLocaleString("id-ID", { style: "currency", currency: "IDR" }),
    },
    {
      label: "Status Transaction",
      value: dataTransaction.status,
    },
    {
      label: "Proof Payment",
      value: dataTransaction.proofPaymentUrl,
    },
  ];

  const handleChange = (e) => {
    setDataStatus(e.target.value);
  };

  const handleEditStatusTransaction = () => {
    if (dataTransaction.status !== "pending") {
      toast.warning("Just pending transaction can be updated", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      status: dataStatus,
    };

    axios
      .post(
        `${BASE_URL + UPDATE_TRANSACTION_STATUS + router.query.id}`,
        payload,
        config
      )
      .then((res) => {
        toast.success("Status updated successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleDataTransaction();
      })
      .catch((err) => console.log(err));
  };

  const cancelTransaction = () => {
    if (dataTransaction.status !== "pending") {
      toast.warning("Just pending transaction can be cancelled", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .post(`${BASE_URL + CANCEL_TRANSACTION + router.query.id}`, null, config)
      .then((res) => {
        toast.info("Transaction cancelled", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleDataTransaction();
      })
      .catch((err) => console.log(err));
  };

  const dataInputStatus = [
    {
      label: "Failed",
      value: "failed",
    },
    {
      label: "Success",
      value: "success",
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (router.query.id) {
      handleDataTransaction();
    }
  }, [router.query.id]);

  if (!isClient) return null;

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen pb-5 font-raleway text-slate-800 bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 overflow-auto duration-200 ease-in-out md:max-w-xl lg:max-w-4xl">
          <h1 className="w-full text-3xl font-bold text-center text-white underline font-playfair-display underline-offset-8">
            Transaction Details
          </h1>

          <div className="grid max-w-sm grid-cols-2 gap-5 p-5 mx-auto border shadow-lg min-w-max shadow-orange-400 bg-slate-100 rounded-xl">
            {dataInput.map((input, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  input.label === "Proof Payment" && "col-span-2 text-left"
                } gap-1`}
              >
                <label htmlFor="name" className="font-medium">
                  {input.label}
                </label>
                {input.label === "Payment Method" ? (
                  <img
                    src={input.value}
                    alt={input.label}
                    className="object-contain w-20 aspect-video"
                  />
                ) : input.label === "Proof Payment" ? (
                  <a
                    href={input.value}
                    target="_blank"
                    className="w-40 text-sm text-blue-500 underline line-clamp-1"
                  >
                    {input.value}
                  </a>
                ) : (
                  <span className="py-1 text-sm">{input.value}</span>
                )}
              </div>
            ))}
            <div className="flex justify-between col-span-2 mt-5">
              <Button variant="destructive" onClick={cancelTransaction}>
                Cancel Transaction
              </Button>
              <Dialog>
                <DialogTrigger>
                  <Button variant="secondary">Edit Status Transaction</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Status Transaction</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to edit status transaction?
                    </DialogDescription>
                  </DialogHeader>
                  {dataInputStatus.map((input, index) => (
                    <div key={index} className="space-x-2">
                      <input
                        type="radio"
                        id={input.value}
                        name="status"
                        value={input.value}
                        checked={dataStatus === input.value}
                        onChange={handleChange}
                      />
                      <label htmlFor={input.value}>{input.label}</label>
                    </div>
                  ))}
                  <DialogFooter>
                    <DialogClose>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleEditStatusTransaction}>
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailTransaction;
