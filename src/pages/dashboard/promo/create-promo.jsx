import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { PromoContext } from "@/contexts/promoContext";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { CREATE_PROMO } from "@/pages/api/promo";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePromo = () => {
  const { handleDataPromo } = useContext(PromoContext);
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

  console.log(dataPromo);

  const dataInput = [
    {
      name: "title",
      type: "text",
      label: "Title Promo",
      placeholder: "Promo Name",
    },
    {
      name: "description",
      type: "text",
      label: "Description Promo",
      placeholder: "Promo Description",
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Image URL",
      placeholder: "Image URL",
    },
    {
      name: "terms_condition",
      type: "text",
      label: "Terms & Condition",
      placeholder: "Terms & Condition",
    },
    {
      name: "promo_code",
      type: "text",
      label: "Promo Code",
      placeholder: "Promo Code",
    },
    {
      name: "promo_discount_price",
      type: "number",
      label: "Promo Discount Price",
      placeholder: "Promo Discount Price",
    },
    {
      name: "minimum_claim_price",
      type: "number",
      label: "Minimum Claim Price",
      placeholder: "Minimum Claim Price",
    },
  ];

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
        toast.success("Create Promo Successfully", {
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

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen pb-5 text-white bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center text-white underline underline-offset-8">
            Create Promo
          </h1>

          <form
            onSubmit={submitData}
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

export default CreatePromo;
