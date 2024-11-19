import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { PromoContext } from "@/contexts/promoContext";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { PROMO_ID, UPDATE_PROMO } from "@/pages/api/promo";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailPromo = () => {
  const router = useRouter();
  const { dataPromo, handleDataPromo } = useContext(PromoContext);
  const [promoId, setPromoId] = useState({});

  const dataInput = [
    {
      name: "title",
      type: "text",
      label: "Title Promo",
      placeholder: "Promo Name",
      value: promoId.title,
    },
    {
      name: "description",
      type: "text",
      label: "Description Promo",
      placeholder: "Promo Description",
      value: promoId.description,
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Image URL",
      placeholder: "Image URL",
      value: promoId.imageUrl,
    },
    {
      name: "terms_condition",
      type: "text",
      label: "Terms & Condition",
      placeholder: "Terms & Condition",
      value: promoId.terms_condition,
    },
    {
      name: "promo_code",
      type: "text",
      label: "Promo Code",
      placeholder: "Promo Code",
      value: promoId.promo_code,
    },
    {
      name: "promo_discount_price",
      type: "number",
      label: "Promo Discount Price",
      placeholder: "Promo Discount Price",
      value: promoId.promo_discount_price,
    },
    {
      name: "minimum_claim_price",
      type: "number",
      label: "Minimum Claim Price",
      placeholder: "Minimum Claim Price",
      value: promoId.minimum_claim_price,
    },
  ];

  const handlePromoId = () => {
    setPromoId(dataPromo.find((item) => item.id === router.query.id));
  };

  const handleChange = (e) => {
    setPromoId({
      ...promoId,
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
      title: promoId.title,
      description: promoId.description,
      imageUrl: promoId.imageUrl,
      terms_condition: promoId.terms_condition,
      promo_code: promoId.promo_code,
      promo_discount_price: Number(promoId.promo_discount_price),
      minimum_claim_price: Number(promoId.minimum_claim_price),
    };

    axios
      .post(`${BASE_URL + UPDATE_PROMO + router.query.id}`, payload, config)
      .then((res) => {
        toast.success("Update Promo Successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          handleDataPromo();
          router.push("/dashboard/promo");
        }, 2000);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (router.query.id) {
      handlePromoId();
    }
  }, [router.query.id]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen pb-5 text-white bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline underline-offset-8">
            Edit Promo
          </h1>

          <form
            onSubmit={editPromo}
            className="grid max-w-sm grid-cols-2 gap-5 p-5 mx-auto border rounded-xl"
          >
            {dataInput.map((input) => (
              <div className="flex flex-col gap-1">
                <label htmlFor="name">{input.label}</label>
                <input
                  onChange={handleChange}
                  className="px-2 py-1 rounded-lg text-slate-950"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={input.value}
                />
              </div>
            ))}
            <div className="flex justify-end">
              <Button variant="secondary" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DetailPromo;
