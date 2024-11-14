import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navItem = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Activities",
      href: "/activities",
    },
    {
      name: "Offers",
      href: "/offers",
    },
  ];

  const navContact = [
    {
      icon: <MapPin color="#043DEF" />,
      desc: "Jl. Merdeka No.123, Kec. Setiabudi Jakarta Selatan, DKI Jakarta, Indonesia.",
    },
    {
      icon: <Phone color="#043DEF" />,
      desc: "+62 21 555 6789",
    },
    {
      icon: <Mail color="#043DEF" />,
      desc: "info@skyward.com",
    },
  ];

  const socmed = [
    {
      icon: <Github color="#043DEF" />,
      link: "https://www.github.com/hendrikp49",
    },
    {
      icon: <Instagram color="#043DEF" />,
      link: "https://www.instagram.com/hendrik_prakoso",
    },
    {
      icon: <Linkedin color="#043DEF" />,
      link: "https://www.linkedin.com/in/hendrikprakoso",
    },
  ];

  return (
    <footer className="p-5 mx-auto mb-2 mt-28 font-raleway md:max-w-3xl lg:max-w-6xl bg-skyward-secondary/70 rounded-xl">
      <div className="flex flex-col gap-5 md:gap-10 md:flex-row md:justify-between">
        <div className="flex flex-col gap-3 lg:gap-7">
          <h3 className="text-2xl font-casser">
            <span className="text-skyward-primary">Sky</span>ward
          </h3>
          <p className="text-sm font-light lg:w-4/5">
            Your trusted partner in unforgettable journeys.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:gap-7">
          <h5 className="font-medium">Navigation</h5>
          <ul className="flex flex-col gap-3 lg:gap-7">
            {navItem.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="w-fit hover:text-skyward-primary"
              >
                <li className="text-sm">
                  <p>{item.name}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 lg:gap-7">
          <h5 className="font-medium">Contact</h5>
          {navContact.map((item, index) => (
            <div key={index} className="flex gap-3 lg:gap-7">
              {item.icon}
              <p className="text-sm lg:w-1/2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="h-0.5 mt-10 bg-black/40" />

      <div className="flex flex-col items-center gap-3 mt-5 md:flex-row md:justify-between">
        <p className="text-sm">©2024 Skyward. All rights reserved.</p>
        <div className="flex gap-3 md:gap-7">
          {socmed.map((item, index) => (
            <Link key={index} href={item.link}>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
