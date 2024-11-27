import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteCookie, getCookie } from "cookies-next";
import {
  HandCoins,
  Home,
  Images,
  List,
  LogOut,
  PanelsTopLeft,
  Plane,
  TicketPercent,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserContext } from "@/contexts/userContext";
import { IsOpenContext } from "@/contexts/isOpen";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, handleUser } = useContext(UserContext);
  const { isOpen, handleOpen } = useContext(IsOpenContext);
  const [mounted, setMounted] = useState(false);
  const hamburger = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-menu"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );

  const close = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-x"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
  const menu = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Home />,
    },
    {
      name: "All user",
      link: "/dashboard/all-user",
      icon: <Users />,
    },
    {
      name: "Banner",
      link: "/dashboard/banner",
      icon: <Images />,
    },
    {
      name: "Promo",
      link: "/dashboard/promo",
      icon: <TicketPercent />,
    },
    {
      name: "Activity",
      link: "/dashboard/activity",
      icon: <Plane />,
    },
    {
      name: "Category",
      link: "/dashboard/category",
      icon: <List />,
    },
    {
      name: "Transaction",
      link: "/dashboard/transaction",
      icon: <HandCoins />,
    },
  ];

  const userMenu = [
    {
      name: "Go to website",
      link: "/",
      icon: <PanelsTopLeft />,
    },
    {
      name: "My Profile",
      link: "/user/my-profile",
      icon: <User />,
    },
  ];

  const handleLogout = () => {
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
    handleUser();
  }, []);

  return (
    <aside
      className={`h-screen fixed inline-block py-5 pl-2 ${
        isOpen ? "pr-10 w-52" : "pr-2 w-16"
      }  space-y-10 bg-skyward-tertiary ease-linear font-raleway duration-300`}
    >
      <div className="flex flex-col justify-between h-full transition-all duration-200 ease-in-out transform">
        <div className="space-y-10 overflow-hidden">
          <div className="flex items-center gap-3 pl-3">
            {isOpen ? (
              <>
                <button onClick={handleOpen}>{close}</button>
                <p className="text-xl font-bold md:text-2xl font-casser">
                  <span className="text-skyward-primary">Sky</span>ward
                </p>
              </>
            ) : (
              <button onClick={handleOpen} className="hidden md:block">
                {hamburger}
              </button>
            )}
          </div>

          <ul className="space-y-2">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`flex gap-3 p-3 rounded-md hover:bg-neutral-200 ${
                  pathname === item.link && "bg-neutral-200"
                }`}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{item.icon}</TooltipTrigger>
                    <TooltipContent>{item.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isOpen && <p>{item.name}</p>}
              </Link>
            ))}
          </ul>
        </div>

        {!mounted ? null : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center justify-center gap-3">
                <Avatar>
                  <AvatarImage src={user.profilePictureUrl} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                {isOpen && <p className="text-left">{user.name}</p>}
              </div>
              <DropdownMenuContent className="p-2">
                {userMenu.map((item, index) => (
                  <Link key={index} href={item.link}>
                    <DropdownMenuItem className="flex gap-2 cursor-pointer">
                      {item.icon}
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex gap-2 text-red-600 cursor-pointer"
                >
                  <LogOut color="red" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
