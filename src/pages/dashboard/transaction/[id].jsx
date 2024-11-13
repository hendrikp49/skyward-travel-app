import { API_KEY, BASE_URL } from "@/pages/api/config";
import { TRANSACTION_ID } from "@/pages/api/transaction";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailTransaction = () => {
  const router = useRouter();
  const [dataTransaction, setDataTransaction] = useState({});

  const handleDataTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + TRANSACTION_ID + router.query.id}`, config)
      .then((res) => {
        console.log(res.data.data);
        setDataTransaction(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (router.query.id) {
      handleDataTransaction();
    }
  }, [router.query.id]);

  return (
    <div>
      <h1>Invoice ID : {dataTransaction.invoiceId}</h1>
      <p>Order Date : {dataTransaction.orderDate} </p>
      <p>Expired Date : {dataTransaction.expiredDate}</p>
      <img
        src={dataTransaction.payment_method.imageUrl}
        alt={dataTransaction.payment_method.name}
      />
      <p>Order Status : {dataTransaction.status}</p>
      <p>Total Transaction : {dataTransaction.totalAmount}</p>
    </div>
  );
};

export default DetailTransaction;
