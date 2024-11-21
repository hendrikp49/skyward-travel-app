import { ACTIVITY_ID } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ADD_TO_CART } from "../api/cart";
import NavbarUser from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { MapPin, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";

const DetailActivity = () => {
  const token = getCookie("token");
  const role = getCookie("role");
  const router = useRouter();
  const [dataActivity, setDataActivity] = useState({});
  const description = [
    { name: "Description", ket: dataActivity.description },
    { name: "Facilities", ket: dataActivity.facilities },
    { name: "Address", ket: dataActivity.address },
    { name: "Tour Map", ket: dataActivity.location_maps },
  ];

  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ACTIVITY_ID + router.query.id}`, config)
      .then((res) => {
        setDataActivity(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddToCart = () => {
    if (token && role === "admin") {
      toast.error("You are not allowed to add to cart", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!token) {
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
      return toast.warning("Please login first", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    const payload = {
      activityId: dataActivity.id,
    };

    axios
      .post(`${BASE_URL + ADD_TO_CART}`, payload, config)
      .then((res) => {
        toast.success("Add to cart successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => console.log(err));
  };

  const rating = (banyaknyaRating) => {
    let stars = "";

    for (let i = 1; i <= banyaknyaRating; i++) {
      if (i <= 5) {
        stars += "⭐";
      } else {
        break;
      }
    }

    return stars;
  };

  useEffect(() => {
    {
      router.query.id && handleDataActivity();
    }
  }, [router.query.id]);

  return (
    <div className="font-raleway">
      <NavbarUser />

      <div className="mt-10">
        <div className="mx-auto space-y-10 rounded-xl md:max-w-3xl lg:max-w-6xl">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <MapPin color="#04b3ef" size={16} />
              <span className="text-sm font-light">
                {dataActivity.city}, {dataActivity.province}
              </span>
            </div>
            <h2 className="text-3xl font-medium">
              {dataActivity.title}, {dataActivity.category?.name}
            </h2>
            <div className="flex gap-2">
              <span>{rating(dataActivity.rating)}</span>
              <span>({dataActivity.total_reviews} reviews)</span>
            </div>
            {dataActivity.imageUrls && (
              <div className="overflow-hidden border shadow-sm h-80 rounded-xl shadow-slate-800">
                <img
                  src={dataActivity.imageUrls[0]}
                  alt={dataActivity.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          <div className="space-y-5">
            {description.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-xl font-medium ">{item.name}</h4>
                {item.name === "Tour Map" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.ket,
                    }}
                  ></div>
                ) : (
                  <p>{item.ket}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-5 bg-skyward-primary rounded-xl">
            <div className="flex flex-col gap-1 text-white">
              {dataActivity.price && (
                <span className="text-xs font-light line-through text-slate-200">{`Rp ${dataActivity.price.toLocaleString(
                  "id-ID"
                )}`}</span>
              )}
              {dataActivity.price_discount && (
                <span className="text-lg font-medium md:text-2xl">
                  {" "}
                  {`Rp ${dataActivity.price_discount.toLocaleString("id-ID")}`}
                </span>
              )}
            </div>

            <Button variant="secondary" onClick={handleAddToCart}>
              <ShoppingCart />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailActivity;
