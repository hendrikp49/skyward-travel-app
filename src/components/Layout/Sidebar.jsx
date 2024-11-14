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
import {
  HandCoins,
  Home,
  Images,
  List,
  Plane,
  TicketPercent,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menu = [
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

  return (
    <aside
      className={`h-screen w-fit inline-block py-5 pl-2 ${
        isOpen ? "pr-10" : "pr-2"
      }  space-y-10 bg-skyward-tertiary ease-linear duration-500`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-10">
          <Link href={"/dashboard"} className="flex gap-3 pl-3">
            {isOpen ? (
              <p className="text-xl font-bold md:text-3xl">
                <span className="text-skyward-primary">Sky</span>ward
              </p>
            ) : (
              <Home />
            )}
          </Link>

          <ul className="space-y-2">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="flex gap-3 p-3 rounded-md hover:bg-neutral-200"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{item.icon}</TooltipTrigger>
                    <TooltipContent>{item.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {isOpen && <p>{item.name}</p>}
                {/* <p>{item.name}</p> */}
              </Link>
            ))}
            <button onClick={() => setIsOpen(!isOpen)}>click</button>
          </ul>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-3 pl-3">
              <User />
              {isOpen && <p>Username</p>}
            </div>
            <DropdownMenuContent>
              <DropdownMenuItem>1</DropdownMenuItem>
              <DropdownMenuItem>2</DropdownMenuItem>
              <DropdownMenuItem>3</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default Sidebar;
