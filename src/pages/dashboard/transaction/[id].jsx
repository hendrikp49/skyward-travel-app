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
import { IsOpenContext } from "@/contexts/isOpen";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import {
  CANCEL_TRANSACTION,
  TRANSACTION_ID,
  UPDATE_TRANSACTION_STATUS,
} from "@/pages/api/transaction";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DetailTransaction = () => {
  const router = useRouter();
  const [dataTransaction, setDataTransaction] = useState({});
  const [dataStatus, setDataStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isOpen } = useContext(IsOpenContext);
  const [isClient, setIsClient] = useState(false);

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
        setTimeout(() => {
          setOpenModal(false);
        }, 1000);
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
        setTimeout(() => {
          setOpenModal(false);
        }, 1000);
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

      <main
        className={`flex flex-col items-center overflow-auto justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-screen font-poppins py-2 ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out min-w-max md:max-w-2xl lg:max-w-4xl">
          <h1 className="w-full text-3xl font-bold text-center text-white underline font-playfair-display underline-offset-8">
            Transaction Details
          </h1>

          <div className="grid max-w-sm grid-cols-2 gap-5 p-5 mx-auto border shadow-md shadow-orange-400 bg-slate-100 rounded-xl">
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
            <div className="flex justify-between col-span-2 gap-2 mt-5">
              <Dialog>
                <DialogTrigger asChild onClick={() => setOpenModal(true)}>
                  <Button
                    disabled={dataTransaction.status !== "pending"}
                    variant={
                      dataTransaction.status === "pending"
                        ? "destructive"
                        : "disabled"
                    }
                  >
                    Cancel Transaction
                  </Button>
                </DialogTrigger>
                {openModal && (
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure want to cancel transaction?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={cancelTransaction}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>

              <Dialog>
                <DialogTrigger asChild onClick={() => setOpenModal(true)}>
                  <Button
                    disabled={dataTransaction.status !== "pending"}
                    variant={
                      dataTransaction.status === "pending"
                        ? "secondary"
                        : "disabled"
                    }
                  >
                    Edit Status
                  </Button>
                </DialogTrigger>
                {openModal && (
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
                )}
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailTransaction;
