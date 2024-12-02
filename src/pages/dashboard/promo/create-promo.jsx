import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IsOpenContext } from "@/contexts/isOpen";
import { PromoContext } from "@/contexts/promoContext";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import { CREATE_PROMO } from "@/pages/api/promo";
import { UPLOAD } from "@/pages/api/upload";
import axios from "axios";
import { getCookie } from "cookies-next";
import { X } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePromo = () => {
  const { handleDataPromo } = useContext(PromoContext);
  const router = useRouter();
  const { isOpen } = useContext(IsOpenContext);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [dataPromo, setDataPromo] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: 0,
    minimum_claim_price: 0,
  });

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
      type: "file",
      label: "Image URL",
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

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUploadImage = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const formData = new FormData();
    formData.append("image", image);

    axios
      .post(`${BASE_URL + UPLOAD}`, formData, config)
      .then((res) => {
        setUploadImage(res.data.url);
      })
      .catch((err) => console.log(err.response));
  };

  const handleDeleteBanner = () => {
    setUploadImage(null);
    setImage(null);

    document.getElementById("file-input").value = "";
  };

  const submitData = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      title: dataPromo.title,
      description: dataPromo.description,
      imageUrl: uploadImage,
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
        handleDataPromo();
        router.push("/dashboard/promo");
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (image) {
      handleUploadImage();
    }
  }, [image]);

  return (
    <div className="flex md:h-screen lg:h-auto">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full font-poppins text-slate-800 overflow-auto ease-linear duration-300  py-5`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-center underline text-slate-800 font-playfair-display underline-offset-8">
            Create Promo
          </h1>

          <form
            onSubmit={submitData}
            className="grid max-w-sm grid-cols-1 gap-5 p-5 mx-auto border shadow-sm shadow-slate-400 min-w-max rounded-xl"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={uploadImage}
                alt={uploadImage && dataPromo.title}
                className={`object-cover w-full rounded-md h-44 ${
                  !uploadImage && "bg-slate-400"
                }`}
              />
              <p
                className={`absolute text-slate-800 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                  uploadImage && "hidden"
                }`}
              >
                Preview Image
              </p>
              <div
                onClick={handleDeleteBanner}
                className={`absolute ${
                  !uploadImage && "hidden"
                } p-1 bg-red-500 rounded-full active:scale-90 ease-in-out duration-300 cursor-pointer top-2 right-2`}
              >
                <X size={16} color="white" />
              </div>
            </div>

            {dataInput.map((input) => (
              <div className="flex flex-col gap-1">
                <label htmlFor="name">{input.label}</label>
                {input.type === "file" ? (
                  <Input
                    id="file-input"
                    onChange={handleChangeImage}
                    accept="image/*"
                    className="px-2 py-1 bg-white rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                ) : (
                  <input
                    onChange={handleChange}
                    className="px-2 py-1 border rounded-lg text-slate-950"
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                  />
                )}
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
