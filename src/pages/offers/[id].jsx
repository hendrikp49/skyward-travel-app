import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import { PROMO_ID } from "../api/promo";
import axios from "axios";
import NavbarUser from "@/components/Layout/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Footer from "@/components/Layout/Footer";

const OfferDetail = () => {
  const router = useRouter();
  const [dataOffer, setDataOffer] = useState({});

  const handleDataOffer = () => {
    const config = {
      headers: {
        apiKey: API_KEY,
      },
    };

    axios
      .get(`${BASE_URL + PROMO_ID + router.query.id}`, config)
      .then((res) => {
        setDataOffer(res.data.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (router.query.id) {
      handleDataOffer();
    }
  }, [router.query.id]);

  return (
    <div className="font-raleway">
      <NavbarUser />

      <div className="mt-10">
        <div className="mx-auto space-y-10 rounded-xl md:max-w-3xl lg:max-w-6xl">
          <section className="flex flex-col gap-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/offers">Offers</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Offers Detail</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="space-y-5">
              <img
                src={dataOffer.imageUrl}
                alt={dataOffer.title}
                className="object-cover w-full rounded-xl h-72"
              />
              <div className="flex justify-between p-3 border max-w-56 rounded-xl bg-skyward-secondary">
                <span>Promo Code :</span>
                <span className="text-lg font-bold">
                  {dataOffer.promo_code}
                </span>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">{dataOffer.title}</h3>
              <p>{dataOffer.description}</p>
            </div>

            <div className="space-y-7">
              <div className="space-y-2">
                <h3 className="text-xl font-medium">Terms & Conditions</h3>
                <p>{dataOffer.terms_condition}</p>
              </div>

              <div className="space-y-1">
                {dataOffer.minimum_claim_price && (
                  <p>
                    Minimum Transaction : Rp.{" "}
                    {dataOffer.minimum_claim_price.toLocaleString("id")}
                  </p>
                )}
                {dataOffer.promo_discount_price && (
                  <p>
                    Promo Discount : Rp.{" "}
                    {dataOffer.promo_discount_price.toLocaleString("id")}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OfferDetail;
