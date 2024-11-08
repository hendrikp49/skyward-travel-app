import { API_KEY, BASE_URL } from "@/pages/api/config";
import { TRANSACTIONS } from "@/pages/api/transaction";
import axios from "axios";
import { useEffect, useState } from "react";

const AllTransaction = () => {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_Page: 5,
    total_Page: 0,
  });

  const handleDataTransaction = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`${BASE_URL + TRANSACTIONS}`, config)
      .then((res) => {
        console.log(res.data.data);
        setDataTransaction(res.data.data);
        setPagination({
          ...pagination,
          total_Page: Math.ceil(res.data.data.length / pagination.per_Page),
        });
      })
      .catch((err) => console.log(err));
  };

  const firstIndexData =
    pagination.page * pagination.per_Page - pagination.per_Page;
  const lastIndexData = pagination.page * pagination.per_Page;
  const dataPage = dataTransaction.slice(firstIndexData, lastIndexData);

  useEffect(() => {
    handleDataTransaction();
  }, []);

  return (
    <div>
      {dataPage.map((data) => (
        <div key={data.id} className="space-y-2 border">
          <p>{data.invoiceId}</p>
          <p>{data.orderDate}</p>
          <img
            src={data.payment_method.imageUrl}
            alt={data.payment_method.name}
          />
          <p>{data.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

export default AllTransaction;
