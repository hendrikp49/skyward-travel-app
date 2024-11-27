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
      icon: <MapPin color="#04b3ef" />,
      desc: "Jl. Merdeka No.123, Kec. Setiabudi Jakarta Selatan, DKI Jakarta, Indonesia.",
    },
    {
      icon: <Phone color="#04b3ef" />,
      desc: "+62 21 555 6789",
    },
    {
      icon: <Mail color="#04b3ef" />,
      desc: "info@skyward.com",
    },
  ];

  const socmed = [
    {
      name: "Github",
      icon: <Github color="#04b3ef" />,
      link: "https://www.github.com/hendrikp49",
    },
    {
      name: "Instagram",
      icon: <Instagram color="#04b3ef" />,
      link: "https://www.instagram.com/hendrik_prakoso",
    },
    {
      name: "Linkedin",
      icon: <Linkedin color="#04b3ef" />,
      link: "https://www.linkedin.com/in/hendrikprakoso",
    },
  ];

  return (
    <footer className="p-5 text-white mt-28 font-raleway bg-slate-700">
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
          <h4 className="font-medium">Navigation</h4>
          <ul className="flex flex-col gap-3 lg:gap-7">
            {navItem.map((item, index) => (
              <li key={index} className="w-fit hover:text-skyward-primary">
                <Link href={item.href} className="text-sm">
                  <p>{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 lg:gap-7">
          <h4 className="font-medium">Contact</h4>
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
        <p className="text-sm text-center">
          © 2024 Skyward | Built with passion by Hendrik Prakoso.
        </p>
        <div className="flex gap-3 md:gap-7">
          {socmed.map((item, index) => (
            <a
              key={index}
              href={item.link}
              aria-label={item.name}
              target="_blank"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
