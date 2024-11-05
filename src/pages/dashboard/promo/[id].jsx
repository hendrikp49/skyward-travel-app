import { API_KEY, BASE_URL } from "@/pages/api/config";
import { PROMO_ID, UPDATE_PROMO } from "@/pages/api/promo";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailPromo = () => {
  const router = useRouter();
  const [dataPromo, setDataPromo] = useState({});

  const handleDataPromo = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + PROMO_ID + router.query.id}`, config)
      .then((res) => setDataPromo(res.data.data))
      .catch((err) => console.log(err.response));
  };

  const handleChange = (e) => {
    setDataPromo({
      ...dataPromo,
      [e.target.name]: e.target.value,
    });
  };

  const editPromo = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const payload = {
      title: dataPromo.title,
      description: dataPromo.description,
      imageUrl: dataPromo.imageUrl,
      terms_condition: dataPromo.terms_condition,
      promo_code: dataPromo.promo_code,
      promo_discount_price: Number(dataPromo.promo_discount_price),
      minimum_claim_price: Number(dataPromo.minimum_claim_price),
    };

    axios
      .post(`${BASE_URL + UPDATE_PROMO + router.query.id}`, payload, config)
      .then((res) => {
        alert("Update Success");
        setTimeout(() => {
          router.push("/dashboard/promo");
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (router.query.id) {
      handleDataPromo();
    }
  }, [router.query.id]);

  return (
    <div>
      <img
        src={dataPromo.imageUrl}
        alt={dataPromo.title}
        className="w-24 aspect-square"
      />
      <form onSubmit={editPromo}>
        <input
          onChange={handleChange}
          className="border"
          type="text"
          name="name"
          value={dataPromo.title}
        />
        <input
          onChange={handleChange}
          className="border"
          type="text"
          name="description"
          value={dataPromo.description}
        />
        <input
          onChange={handleChange}
          className="border"
          type="text"
          name="imageUrl"
          value={dataPromo.imageUrl}
        />
        <input
          onChange={handleChange}
          className="border"
          type="text"
          name="terms_condition"
          value={dataPromo.terms_condition}
        />
        <input
          onChange={handleChange}
          className="border"
          type="text"
          name="promo_code"
          value={dataPromo.promo_code}
        />
        <input
          onChange={handleChange}
          className="border"
          type="text"
          name="promo_discount_price"
          value={dataPromo.promo_discount_price}
        />
        <input
          onChange={handleChange}
          className="border"
          type="text"
          name="minimum_claim_price"
          value={dataPromo.minimum_claim_price}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default DetailPromo;
