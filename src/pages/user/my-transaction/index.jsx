import Footer from "@/components/Layout/Footer";
import NavbarUser from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import {
  CANCEL_TRANSACTION,
  MY_TRANSACTIONS,
  UPDATE_TRANSACTION_PROOF,
} from "@/pages/api/transaction";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyTransaction = () => {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [file, setFile] = useState(null);
  const [dataUpload, setDataUpload] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDataTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + MY_TRANSACTIONS}`, config)
      .then((res) => {
        setDataTransaction(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = new FormData();
    payload.append("image", file);

    axios
      .post(`${BASE_URL + UPLOAD}`, payload, config)
      .then((res) => {
        setDataUpload(res.data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleUploadImage = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      proofPaymentUrl: dataUpload,
    };

    axios
      .post(`${BASE_URL + UPDATE_TRANSACTION_PROOF + id}`, payload, config)
      .then((res) => {
        toast.success("Upload Success", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        handleDataTransaction();
        setIsOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const cancelTransaction = (id) => {
    const dataTransactionDetail = dataTransaction.find(
      (item) => item.id === id
    );
    if (dataTransactionDetail.status !== "pending") {
      toast.warning("Just pending transaction can be cancelled", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsOpen(false);
      return;
    }

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .post(`${BASE_URL + CANCEL_TRANSACTION + id}`, null, config)
      .then((res) => {
        toast.info("Transaction cancelled", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsOpen(false);
        handleDataTransaction();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleUpload();
  }, [file]);

  useEffect(() => {
    handleDataTransaction();
  }, []);

  return (
    <div className="font-raleway bg-zinc-50">
      <NavbarUser />

      <div className="mt-20 overflow-auto">
        <div className="py-2 mx-auto space-y-10 min-w-96 md:max-w-3xl lg:max-w-5xl">
          <h1 className="text-2xl font-bold font-playfair-display">
            My Transaction
          </h1>

          {dataTransaction
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((data) => (
              <div className="p-5 space-y-5 overflow-auto bg-white rounded-lg shadow-sm shadow-slate-600">
                <table key={data.id} className="w-full">
                  <thead className="border-b rounded-lg border-slate-700">
                    <tr className="py-5">
                      <th className="text-left">Product</th>
                      <th className="text-left">Price</th>
                      <th>Qty</th>
                      <th className="text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {data.transaction_items.map((item) => (
                      <tr key={item.id} className="border-b ">
                        <td className="flex items-center justify-start gap-5 py-3">
                          <img
                            className="object-cover rounded-md w-14 aspect-square"
                            src={item.imageUrls[0]}
                            alt={item.title}
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="py-3 text-left">
                          Rp. {item.price_discount.toLocaleString("id")}
                        </td>
                        <td className="py-3 space-x-2 text-center">
                          <p className="inline-block">{item.quantity}</p>
                        </td>
                        <td className="py-3 text-right">
                          Rp.{" "}
                          {(item.price_discount * item.quantity).toLocaleString(
                            "id"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between p-3 overflow-hidden border border-skyward-secondary rounded-xl">
                  <p>
                    Upload Proof of Payment{" "}
                    <Dialog>
                      <DialogTrigger onClick={() => setIsOpen(true)}>
                        <button className="text-skyward-primary">Here</button>
                      </DialogTrigger>
                      {isOpen && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Upload Proof of Payment</DialogTitle>
                          </DialogHeader>
                          <Input type="file" onChange={handleChange} />
                          <DialogFooter className="justify-end">
                            <Button
                              onClick={() => {
                                handleUploadImage(data.id);
                              }}
                            >
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </p>
                  <a
                    href={data.proofPaymentUrl ? data.proofPaymentUrl : null}
                    target="_blank"
                    className={`text-right ${
                      data.proofPaymentUrl ? "underline text-blue-600" : null
                    }  line-clamp-1 w-3/5`}
                  >
                    {data.proofPaymentUrl
                      ? data.proofPaymentUrl
                      : "The payment receipt hasn't been uploaded yet."}
                  </a>
                </div>

                <div className="flex items-center justify-between px-3 py-5 mt-10 overflow-auto text-white rounded-xl bg-gradient-to-br from-skyward-primary to-fuchsia-500">
                  <div className="space-y-1">
                    <p className="text-sm">
                      Status :{" "}
                      <span className="text-xl font-medium">{data.status}</span>
                    </p>
                    <Dialog>
                      <DialogTrigger onClick={() => setIsOpen(true)}>
                        <Button
                          className="disabled:cursor-not-allowed"
                          disabled={data.status !== "pending"}
                          variant={
                            data.status !== "pending"
                              ? "disabled"
                              : "destructive"
                          }
                        >
                          Cancel Transaction
                        </Button>
                      </DialogTrigger>
                      {isOpen && data.status === "pending" && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure you want to cancel this transaction?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => cancelTransaction(data.id)}>
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm">Total Price : </p>
                    <span className="text-2xl font-medium">
                      Rp.{" "}
                      {data.transaction_items
                        .reduce(
                          (acc, item) =>
                            acc + item.price_discount * item.quantity,
                          0
                        )
                        .toLocaleString("id")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyTransaction;
