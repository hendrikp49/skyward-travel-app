import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../../api/config";
import axios from "axios";
import { DELETE_PROMO, PROMO } from "../../api/promo";
import Link from "next/link";

const Promo = () => {
  const [dataPromo, setDataPromo] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    per_Page: 5,
    total_Page: 0,
  });

  const handleDataPromo = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + PROMO}`, config)
      .then((res) => {
        setDataPromo(res.data.data);
        setPagination({
          ...pagination,
          total_Page: Math.ceil(res.data.data.length / pagination.per_Page),
        });
      })
      .catch((err) => console.log(err.response));
  };

  const firstIndexData =
    pagination.page * pagination.per_Page - pagination.per_Page;
  const lastIndexData = pagination.page * pagination.per_Page;
  const dataPromoPage = dataPromo.slice(firstIndexData, lastIndexData);

  const handleNext = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteData = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_PROMO + id}`, config)
      .then((res) => {
        alert("Delete Success");
        handleDataPromo();
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handleDataPromo();
  }, []);

  return (
    <div>
      <Link href={`/dashboard/promo/create-promo`}>
        <p>Create</p>
      </Link>
      {dataPromoPage.map((promo) => (
        <div key={promo.id}>
          <img
            src={promo.imageUrl}
            alt={promo.title}
            className="w-24 aspect-square"
          />
          <p>{promo.title}</p>
          <p>{promo.description}</p>
          <Link href={`/dashboard/promo/${promo.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => deleteData(promo.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleBack} disabled={pagination.page === 1}>
        Prev
      </button>
      <button
        onClick={handleNext}
        disabled={pagination.page === pagination.total_Page}
      >
        Next
      </button>
    </div>
  );
};

export default Promo;
