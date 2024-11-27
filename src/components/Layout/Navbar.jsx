import { deleteCookie, getCookie } from "cookies-next";
import { Button } from "../ui/button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  BookOpenText,
  Database,
  Home,
  LogOut,
  Menu,
  PlaneTakeoff,
  ShoppingBag,
  ShoppingCart,
  TicketPercent,
  User,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { CartContext } from "@/contexts/cartContext";
import { UserContext } from "@/contexts/userContext";

const NavbarUser = () => {
  const { dataCart, handleDataCart } = useContext(CartContext);
  const { user, handleUser } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const token = getCookie("token");
  const navItem = [
    {
      name: "Home",
      href: "/",
      icon: <Home />,
    },
    {
      name: "About",
      href: "/about",
      icon: <BookOpenText />,
    },
    {
      name: "Activities",
      href: "/activities",
      icon: <PlaneTakeoff />,
    },
    {
      name: "Offers",
      href: "/offers",
      icon: <TicketPercent />,
    },
  ];

  const handleOpen = () => setIsOpen(!isOpen);

  const handleLogout = (id) => {
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("idUser");
    toast.success("Logout successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    router.push("/");
  };

  useEffect(() => {
    setMounted(true);
    if (token) {
      handleUser();
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleDataCart();
    }
  }, [dataCart.length]);

  return (
    <div className="bg-white shadow-md shadow-neutral-200 font-poppins">
      <nav className="flex items-center justify-between py-4 mx-auto md:max-w-3xl lg:max-w-6xl ">
        <div>
          <Link href={"/"}>
            <p className="text-2xl font-bold md:text-4xl font-casser">
              <span className="text-skyward-primary">Sky</span>ward
            </p>
          </Link>
        </div>
        <ul className="hidden gap-5 lg:gap-8 md:flex">
          {navItem.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`hover:text-skyward-primary ${
                  pathname === item.href && "text-skyward-primary"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {!mounted ? null : (
          <div className="flex items-center justify-center gap-3 md:gap-5">
            {token && user.role === "user" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/user/cart"} className="relative">
                      <ShoppingCart />
                      <div className="absolute flex items-center justify-center w-5 text-xs text-white rounded-full -top-4 -right-3 bg-skyward-primary aspect-square">
                        {dataCart.reduce((acc, item) => acc + item.quantity, 0)}
                      </div>
                    </Link>
                    <TooltipContent>My Cart</TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            )}
            <DropdownMenu>
              {token && (
                <DropdownMenuTrigger className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.profilePictureUrl} alt={user.name} />

                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-xs md:block">{user.name}</span>
                </DropdownMenuTrigger>
              )}
              {token && user.role === "user" ? (
                <DropdownMenuContent className="p-2 space-y-2">
                  <DropdownMenuItem>
                    <Link className="flex gap-2" href={"/user/my-profile"}>
                      <User />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="flex gap-2" href={"/user/my-transaction"}>
                      <ShoppingBag />
                      <span>My Transaction</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      variant="ghost"
                      onClick={() => handleLogout(user.id)}
                      className="flex gap-2"
                    >
                      <LogOut color="red" />
                      <span className="text-red-700">Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link className="flex gap-2" href={"/dashboard"}>
                      <Database />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="flex gap-2" href={"/user/my-profile"}>
                      <User />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      variant="ghost"
                      onClick={() => handleLogout(user.id)}
                      className="flex gap-2"
                    >
                      <LogOut color="red" />
                      <span className="text-red-700">Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>

            {!token && (
              <Link href={"/auth/login"}>
                <Button>Login</Button>
              </Link>
            )}
            {/* hamburger menu */}
            <div className="md:hidden">
              <Button variant="ghost" onClick={handleOpen}>
                <Menu />
              </Button>
            </div>
          </div>
        )}
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
        <Button
          variant="ghost"
          onClick={handleOpen}
          className="self-end my-2 mr-2 w-fit"
        >
          <X />
        </Button>

        <ul className="">
          {navItem.map((item, index) => (
            <Link key={index} href={item.href} className="">
              <li className="flex gap-5 py-5 pl-5 duration-200 ease-in-out hover:bg-blue-300">
                {item.icon}
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
