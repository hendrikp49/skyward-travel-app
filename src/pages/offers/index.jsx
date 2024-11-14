import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import { PROMO } from "../api/promo";
import NavbarUser from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { useRouter } from "next/router";

const Offers = () => {
  const router = useRouter();
  const [dataOffers, setDataOffers] = useState([]);

  const handleDataOffers = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + PROMO}`, config)
      .then((res) => {
        setDataOffers(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handleDataOffers();
  }, []);

  return (
    <div className="font- font-raleway">
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
            <h2 className="text-2xl font-bold font-casser">Offers</h2>
            <p className="mx-auto text-sm font-light font-poppins md:max-w-xl">
              Discover exclusive travel deals and handpicked packages designed
              to bring you closer to the world's most breathtaking destinations,
              all while saving on unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 mx-auto mt-28 font-raleway md:max-w-lg lg:max-w-3xl">
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold md:text-3xl font-playfair-display">
            Enjoy Our Travel Deals
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 justify-items-center lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dataOffers.map((item) => (
            <div
              onClick={() => router.push(`/offers/${item.id}`)}
              key={item.id}
              className="relative overflow-hidden cursor-pointer group rounded-xl h-52 aspect-square"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full duration-300 ease-in-out group-hover:rotate-3 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Offers;
