import { useContext, useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import { ACTIVITIES, ACTIVITY_CATEGORY_ID } from "../api/activity";
import axios from "axios";
import Link from "next/link";
import NavbarUser from "@/components/Layout/Navbar";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  MoveRight,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Layout/Footer";
import { CATEGORY } from "../api/category";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_TO_CART } from "../api/cart";
import { useRouter } from "next/router";
import { CartContext } from "@/contexts/cartContext";

const Activity = () => {
  const token = getCookie("token");
  const role = getCookie("role");
  const router = useRouter();
  const { handleDataCart } = useContext(CartContext);
  const [dataActivity, setDataActivity] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    totalPage: 0,
  });
  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ACTIVITIES}`, config)
      .then((res) => {
        setDataActivity(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDataCategory = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + CATEGORY}`, config)
      .then((res) => {
        setDataCategory(res.data.data);
        setCategory(res.data.data[0]?.id);
      })
      .catch((err) => console.log(err.response));
  };

  const handleCategoryId = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ACTIVITY_CATEGORY_ID + id}`, config)
      .then((res) => {
        setCategoryId(res.data.data);
        setPagination({
          ...pagination,
          totalPage: Math.ceil(res.data.data.length / pagination.perPage),
        });
      })
      .catch((err) => console.log(err.response));
  };

  const firstIndex = pagination.page * pagination.perPage - pagination.perPage;
  const lastIndex = pagination.page * pagination.perPage;
  const currentData = categoryId.slice(firstIndex, lastIndex);

  const rating = (banyaknyaRating) => {
    let stars = "";

    for (let i = 1; i < banyaknyaRating; i++) {
      if (i <= 5) {
        stars += "⭐";
      } else {
        break;
      }
    }
    return stars;
  };

  const nextPage = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  const prevPage = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  const handleAddToCart = (id) => {
    if (token && role === "admin") {
      toast.error("You are an Admin. You are not allowed to add to cart", {
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
        autoClose: 1500,
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
      activityId: id,
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
        handleDataCart();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleDataActivity();
    handleDataCategory();
  }, []);

  useEffect(() => {
    if (category) {
      handleCategoryId(category);
    }
  }, [category]);

  return (
    <div className="font-raleway">
      <NavbarUser />

      <section className="mt-10">
        <div className="relative px-5 py-10 mx-auto overflow-hidden rounded-xl md:max-w-3xl lg:max-w-6xl">
          <div className="absolute top-0 left-0 w-full h-full -z-20">
            <img
              src="images/df2.jpg"
              alt=""
              className="object-cover w-full h-full"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
          </div>
          <div className="space-y-3 text-center text-white">
            <h2 className="text-2xl font-bold font-casser">
              Select Your Favorite Trip Package
            </h2>
            <p className="mx-auto text-sm font-light font-poppins md:max-w-xl lg:max-w-4xl">
              Explore a wide range of thoughtfully crafted travel packages
              tailored to suit every kind of traveler. Whether you're seeking a
              relaxing escape, a cultural adventure, or an exhilarating outdoor
              journey, each package offers unique experiences, exceptional
              value, and memories that will last a lifetime.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-28">
        <div className="mx-auto space-y-5 md:space-y-10 md:max-w-3xl lg:max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* category */}
            {dataCategory.map((item) => (
              <button
                key={item.id}
                onClick={() => setCategory(item.id)}
                className={`px-3 py-1 rounded-md ${
                  item.id === category
                    ? "bg-skyward-primary text-white"
                    : "bg-slate-300 hover:bg-slate-200 ease-in-out duration-200"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* card */}
          <div className="grid grid-cols-1 gap-5 pb-2 lg:gap-10 justify-items-center md:grid-cols-2 lg:grid-cols-3">
            {currentData.map((activity) => (
              <div
                key={activity.id}
                className="max-w-full pb-5 space-y-3 overflow-hidden duration-200 ease-in-out transform border shadow-md hover:shadow-none hover:translate-y-1 min-h-fit w-72 rounded-xl"
              >
                <img
                  src={activity.imageUrls[0]}
                  alt={activity.title}
                  className="object-cover w-full h-1/2"
                />

                <div className="px-2 space-y-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <MapPin color="#04b3ef" size={16} />
                      <span className="text-sm font-light">
                        {activity.category.name}
                      </span>
                    </div>
                    <p>{activity.title}</p>

                    <div className="flex items-center gap-3">
                      <p>{rating(activity.rating)}</p>
                      <span className="text-sm font-light">{`(${activity.total_reviews} reviews)`}</span>
                    </div>
                  </div>

                  <hr />

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs font-light line-through">
                        {`Rp. ${activity.price.toLocaleString("id-ID")}`}
                      </span>
                      <span className="font-medium">
                        {`Rp. ${activity.price_discount.toLocaleString(
                          "id-ID"
                        )}`}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Link href={`/activities/${activity.id}`}>
                        <Button variant="outline">
                          Details
                          <MoveRight />
                        </Button>
                      </Link>
                      <Button onClick={() => handleAddToCart(activity.id)}>
                        Add to Cart
                        <ShoppingCart />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              disabled={pagination.page < 2}
              onClick={prevPage}
              className="p-1 duration-200 ease-in-out rounded-full disabled:hover:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed bg-slate-300 hover:bg-slate-400"
            >
              <ChevronLeft />
            </button>
            <span>
              {pagination.totalPage === 0
                ? "No Data"
                : `${pagination.page} of ${pagination.totalPage}`}
            </span>
            <button
              disabled={
                pagination.page === pagination.totalPage ||
                pagination.totalPage === 0
              }
              onClick={nextPage}
              className="p-1 duration-200 ease-in-out rounded-full disabled:hover:bg-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed bg-slate-300 hover:bg-slate-400"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Activity;
