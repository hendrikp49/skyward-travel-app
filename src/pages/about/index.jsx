import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../api/config";
import { PROMO } from "../api/promo";
import NavbarUser from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const About = () => {
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
            <h2 className="text-2xl font-bold font-casser">About Us</h2>
            <p className="mx-auto text-sm font-light font-poppins md:max-w-xl">
              Learn more about Skyward, a travel platform that connects you to
              the world. We are committed to providing ease, comfort, and
              exceptional experiences for every adventure you embark on.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 mx-auto mt-28 font-raleway md:max-w-3xl lg:max-w-6xl">
        <div className="w-full space-y-2">
          <h2 className="text-xl font-bold md:text-2xl font-playfair-display">
            About Us
          </h2>
          <p className="leading-loose">
            Welcome to Skyward. Skyward is a platform designed to simplify the
            search and booking process for trips to world-renowned tourist
            destinations. We prioritize comfort, ease, and the best experience
            at every stage of your journey. With advanced search features and
            comprehensive information, we are here to help you explore the world
            more effectively and enjoyably. This website was created as part of
            the final project for the Dibimbing bootcamp, where all the
            knowledge and skills learned were applied into a single end project.
            Through Skyward, we not only showcase our technical abilities but
            also provide practical solutions for travelers planning their dream
            journeys. Skyward is more than just a final project—it is a
            testament to our dedication and in-depth learning throughout the
            bootcamp.
          </p>
        </div>
        <div className="w-full space-y-2">
          <h2 className="text-xl font-bold md:text-2xl font-playfair-display">
            Mission
          </h2>
          <p className="leading-loose">
            Our mission is to provide a platform that not only simplifies the
            travel planning process but also delivers valuable experiences
            through technology and innovation. Skyward aims to implement the
            knowledge gained during the bootcamp into a real-world solution that
            helps travelers realize their dream journeys with greater ease and
            convenience.
          </p>
        </div>
        <div className="w-full space-y-2">
          <h2 className="text-xl font-bold md:text-2xl font-playfair-display">
            Vision
          </h2>
          <p className="leading-loose">
            Our vision is to become a trusted travel platform that connects
            travelers to the best destinations worldwide. Through dedication and
            innovation, Skyward aspires to evolve into the ultimate solution for
            those who want to explore the world with greater ease and enjoyment.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-16 mx-auto mt-28 font-raleway md:max-w-3xl lg:max-w-6xl">
        <h2 className="text-xl font-bold text-center md:text-3xl font-playfair-display">
          Frequently Asked Questions
        </h2>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium font-playfair-display">
                What is Skyward?
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                Skyward is a travel search and booking platform designed to help
                users easily and quickly discover the best tourist destinations
                worldwide.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium font-playfair-display">
                What makes Skyward different from other platforms?
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                Skyward offers an easy-to-use interface, advanced search
                capabilities, and comprehensive information about travel
                destinations. Additionally, Skyward is a product of dedication
                to implementing bootcamp learning, making it a unique solution
                for your travel needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium font-playfair-display">
                Is Skyward only for the bootcamp’s final project?
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                While it was initially created as a final project for the
                Dibimbing bootcamp, Skyward is designed to provide real value to
                users in planning their trips.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium font-playfair-display">
                Can I book travel tickets directly through Skyward?
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                Currently, Skyward focuses on providing travel information and
                search features. However, we are continuously innovating and may
                add booking features in the future.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium font-playfair-display">
                Is Skyward's service free of charge?
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                Yes, all search and information features on Skyward are
                completely free to access.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium font-playfair-display">
                What should I do if I encounter an issue while using Skyward?
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base">
                You can contact our team through the email or call center
                number, and we will assist you promptly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
