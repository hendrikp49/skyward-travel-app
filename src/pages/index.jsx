import { useRouter } from "next/router";
import { API_KEY, BASE_URL } from "./api/config";
import { LOGOUT } from "./api/auth";
import axios from "axios";
import { ACTIVITIES } from "@/pages/api/activity";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavbarUser from "@/components/Layout/Navbar";
import { ALL_BANNER } from "./api/banner";
import { MapPin, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROMO } from "./api/promo";
import Footer from "@/components/Layout/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getCookie } from "cookies-next";

const Home = () => {
  const router = useRouter();
  const [dataActivity, setDataActivity] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);
  const [dataPromo, setDataPromo] = useState([]);
  const dataDifference = [
    {
      id: 1,
      name: "Destinations",
      text: "Extensively Curated and Diverse Destinations with Exclusive Local Insights",
      textStyle:
        "m-3 text-sm text-white md:text-left md:w-3/5 md:font-medium md:text-xl",
      overlay:
        "absolute top-0 w-full h-52 lg:w-full -z-10 bg-gradient-to-b from-black/70 to-transparent",
      container:
        "relative flex items-start justify-start w-full overflow-hidden border rounded-lg aspect-square md:rounded-t-xl md:rounded-bl-xl md:rounded-br-[200px]",
      image: "/images/df1.jpg",
    },
    {
      id: 2,
      name: "",
      text: "Comprehensive Expert-Backed Travel Guides and Insider Tips for Seamless Exploration",
      textStyle:
        "m-3 text-sm text-white md:text-right md:w-3/5 md:font-medium md:text-xl",
      overlay:
        "absolute top-0 w-full h-52 lg:w-full -z-10 bg-gradient-to-b from-black/70 to-transparent",
      container:
        "relative flex items-start justify-end w-full overflow-hidden border rounded-lg aspect-square md:rounded-t-xl md:rounded-br-xl md:rounded-bl-[200px]",
      image: "/images/df2.jpg",
    },
    {
      id: 3,
      name: "",
      text: "Flexible and Competitive Pricing Options to Suit Every Budget Without Compromising Quality",
      textStyle:
        "m-3 text-sm text-white md:text-left md:w-3/5 md:font-medium md:text-xl",
      overlay:
        "absolute top-0 md:bottom-0 md:top-auto w-full h-52 lg:w-full -z-10 bg-gradient-to-b md:bg-gradient-to-t from-black/70 to-transparent",
      container:
        "relative flex items-end justify-start w-full overflow-hidden border rounded-lg aspect-square md:rounded-b-xl md:rounded-tl-xl md:rounded-tr-[200px]",
      image: "/images/df3.jpg",
    },
    {
      id: 4,
      name: "",
      text: "User-Friendly Platform with Personalized Recommendations Tailored to Your Unique Travel Preferences",
      textStyle:
        "m-3 text-sm text-white md:text-right md:w-3/5 md:font-medium md:text-xl",
      overlay:
        "absolute top-0 md:bottom-0 md:top-auto w-full h-52 lg:w-full -z-10 bg-gradient-to-b md:bg-gradient-to-t from-black/70 to-transparent",
      container:
        "relative flex items-end justify-end w-full overflow-hidden border rounded-lg aspect-square md:rounded-b-xl md:rounded-tr-xl md:rounded-tl-[200px]",
      image: "/images/df4.jpg",
    },
  ];

  const handleDataActivity = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ACTIVITIES}`, config)
      .then((res) => {
        setDataActivity(res.data.data.slice(0, 6));
      })
      .catch((err) => console.log(err));
  };

  const handleDataBanner = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + ALL_BANNER}`, config)
      .then((res) => setDataBanner(res.data.data.slice(0, 4)))
      .catch((err) => console.log(err.response));
  };

  const handleDataPromo = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + PROMO}`, config)
      .then((res) => {
        setDataPromo(res.data.data.slice(0, 6));
      })
      .catch((err) => console.log(err.response));
  };

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

  useEffect(() => {
    handleDataActivity();
    handleDataBanner();
    handleDataPromo();
  }, []);

  return (
    <div>
      <NavbarUser />

      <div className="relative flex items-center overflow-hidden h-[calc(100vh-110px)] mx-auto mt-5 rounded-xl md:max-w-3xl lg:max-w-6xl">
        <div className="absolute w-full h-full overflow-hidden -z-20">
          <img
            src="images/hero.webp"
            alt="blue ocean"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute w-1/2 h-full -z-10 bg-gradient-to-r from-black/50 to-transparent"></div>

        <div className="flex flex-col w-full gap-3 ml-2 md:gap-4 md:ml-5 lg:ml-10">
          <h1 className="w-full max-w-md text-4xl font-bold text-white lg:max-w-xl lg:text-5xl drop-shadow-md font-casser">
            Embark on Journeys That Redefine Adventure
          </h1>
          <p className="max-w-sm text-white md:leading-normal md:max-w-md drop-shadow-lg font-poppins">
            From serene escapes to thrilling expeditions, let us guide you to
            unforgettable journeys around the world.
          </p>
          <Link href={"/activities"}>
            <Button variant="secondary" className="px-10">
              Explore Now
              <MoveRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Destination */}
      <section className="flex flex-col gap-10 mx-auto mt-28 font-raleway md:max-w-3xl lg:max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-2xl font-bold md:text-3xl font-playfair-display">
            Top Destination
          </h2>
          <p className="max-w-md text-sm md:text-base">
            Explore our handpicked destination, when unforgettable adventures
            and breathtaking await you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:gap-20 justify-items-center md:grid-cols-2 lg:grid-cols-4">
          {dataBanner.map((banner) => (
            <div
              key={banner.id}
              className="relative w-56 overflow-hidden group rounded-xl h-72"
            >
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="object-cover h-full duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h5 className="absolute left-0 right-0 z-20 mx-auto text-lg font-bold text-center text-white text-semibold bottom-5">
                {banner.name}
              </h5>
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section className="flex flex-col gap-10 mx-auto mt-28 font-raleway md:max-w-3xl lg:max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="max-w-xs text-2xl font-bold lg:max-w-md md:text-3xl font-playfair-display">
            Exceptional Global Tour Package Experience
          </h2>
          <p className="max-w-md text-sm lg:max-w-2xl md:text-base">
            Discover the world’s most iconic destination with Exceptional Global
            Tour Package offering unparalleled experience, personalized
            itineraries, and unforgettable memories
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="">
            {dataActivity.map((activity) => (
              <CarouselItem
                key={activity.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="space-y-3 overflow-hidden duration-200 ease-in-out border shadow-md h-96 rounded-xl">
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
                      <Button
                        onClick={() =>
                          router.push(`/activities/${activity.id}`)
                        }
                      >
                        Detail
                      </Button>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-light line-through">
                          {`Rp. ${activity.price.toLocaleString("id-ID")}`}
                        </span>
                        <span className="font-medium">{`Rp. ${activity.price_discount.toLocaleString(
                          "id-ID"
                        )}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Link
          href={"/activities"}
          className="flex justify-center mx-auto w-fit"
        >
          <Button variant="secondary" className="px-10">
            See All Activities
          </Button>
        </Link>
      </section>

      {/* Offers */}
      <section className="flex flex-col gap-10 mx-auto mt-28 font-raleway md:max-w-lg lg:max-w-3xl ">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="max-w-xs text-2xl font-bold lg:max-w-md md:text-3xl font-playfair-display">
            Exclusive Offers for Your Next Unforgettable Journey
          </h2>
          <p className="max-w-md text-sm lg:max-w-2xl md:text-base">
            Unlock Exclusive Travel Deals and Discounts for Your Next Dream
            Destination!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 justify-items-center lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {dataPromo.map((promo) => (
            <div
              onClick={() => router.push(`/offers/${promo.id}`)}
              key={promo.id}
              className="relative w-56 overflow-hidden duration-200 ease-in-out transform shadow-sm cursor-pointer hover:-translate-y-3 hover:shadow-lg shadow-slate-500 hover:shadow-slate-400 hover:translate-x-1 hover:rotate-3 rounded-xl h-72"
            >
              <img
                src={promo.imageUrl}
                alt={promo.name}
                className="object-cover h-full"
              />
            </div>
          ))}
        </div>
        <Link href={"/offers"} className="flex justify-center mx-auto w-fit">
          <Button variant="secondary" className="px-10">
            See All Offers
          </Button>
        </Link>
      </section>

      {/* Book Now */}
      <section className="mx-auto md:max-w-3xl mt-28 lg:max-w-6xl">
        <div
          onClick={() => router.push("/activities")}
          className="relative w-full h-56 overflow-hidden duration-200 ease-in-out transform shadow-md cursor-pointer shadow-slate-500 hover:translate-y-1 hover:shadow-none rounded-xl"
        >
          <img
            src="images/scenery.webp"
            alt="Blue Scenery"
            className="absolute object-cover w-full h-full -z-20"
          />

          <div className="absolute h-full lg:w-9/12 -z-10 bg-gradient-to-r from-black/50 to-transparent"></div>

          <div className="flex flex-col justify-center w-full h-full gap-3 ml-2 text-2xl font-bold text-white lg:gap-5 lg: lg:text-4xl md:text-3xl font-playfair-display md:gap-4 md:ml-5 lg:ml-10">
            <h2>Ready to Explore?</h2>
            <h2>Book Your Adventure Now!</h2>
          </div>
        </div>
      </section>

      {/* Difference */}
      <section className="flex flex-col gap-10 mx-auto mt-28 font-raleway md:max-w-3xl lg:max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <h2 className="max-w-xs text-2xl font-bold lg:max-w-md md:text-3xl font-playfair-display">
            Discover the Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
          {dataDifference.map((item) => (
            <div key={item.id} className={item.container}>
              <div className="absolute w-full h-full border -z-20">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className={item.overlay}></div>

              <h4 className={item.textStyle}>{item.text}</h4>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
