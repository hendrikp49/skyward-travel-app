import { API_KEY, BASE_URL } from "@/pages/api/config";
import { CREATE_PROMO } from "@/pages/api/promo";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const CreatePromo = () => {
  const router = useRouter();
  const [dataPromo, setDataPromo] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });

  const handleChange = (e) => {
    setDataPromo({
      ...dataPromo,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = (e) => {
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
      .post(`${BASE_URL + CREATE_PROMO}`, payload, config)
      .then((res) => {
        alert("Create Success");
        setTimeout(() => {
          router.push("/dashboard/promo");
        }, 1000);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <form onSubmit={submitData}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="imageUrl"
          onChange={handleChange}
        />
        <input
          type="text"
          name="terms_condition"
          placeholder="terms_condition"
          onChange={handleChange}
        />
        <input
          type="text"
          name="promo_code"
          placeholder="promo_code"
          onChange={handleChange}
        />
        <input
          type="number"
          name="promo_discount_price"
          placeholder="promo_discount_price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minimum_claim_price"
          placeholder="minimum_claim_price"
          onChange={handleChange}
        />
        <button onClick={submitData}>submit</button>
      </form>
    </div>
  );
};

export default CreatePromo;
