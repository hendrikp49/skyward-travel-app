import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";

const NavbarUser = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOpen = () => setIsOpen(!isOpen);

  const hamburger = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </svg>
  );

  const closeMenu = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="shadow-md shadow-neutral-200 font-poppins">
      <nav className="flex items-center justify-between py-4 mx-auto md:max-w-3xl lg:max-w-6xl ">
        <div>
          <Link href={"/"}>
            <p className="text-2xl font-bold font-casser">
              <span className="text-skyward-primary">Sky</span>ward
            </p>
          </Link>
        </div>
        <ul className="hidden gap-5 lg:gap-8 md:flex">
          {navItem.map((item, index) => (
            <Link key={index} href={item.href}>
              <li className="hover:text-skyward-primary">{item.name}</li>
            </Link>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-2">
          <Link href={"/auth/login"}>
            <Button>Login</Button>
          </Link>

          {/* hamburger menu */}
          <div className="md:hidden">
            <button onClick={handleOpen}>{hamburger}</button>
          </div>
        </div>
      </nav>

      <div
        onClick={handleOpen}
        className={`fixed inset-0 z-10 transition-all duration-300 ease-in-out transform bg-black/50 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed right-0 top-0 z-20 bg-white flex flex-col h-full transition-all duration-300 ease-in-out transform w-56 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={handleOpen} className="self-end my-2 mr-2 w-fit">
          {closeMenu}
        </button>

        <ul className="text-center">
          {navItem.map((item, index) => (
            <Link key={index} href={item.href}>
              <li className="py-3 duration-200 ease-in-out hover:bg-blue-300">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavbarUser;
