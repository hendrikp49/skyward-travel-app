import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AllUserContext } from "@/contexts/allUserContext";
import Sidebar from "@/components/Layout/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FilePen,
} from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IsOpenContext } from "@/contexts/isOpen";

const AllUser = () => {
  const { isOpen } = useContext(IsOpenContext);
  const { allUsers, handleDataUser } = useContext(AllUserContext);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const allPage = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(allUsers.length / pagination.perPage),
    });
  };

  const indexFirstUser =
    pagination.page * pagination.perPage - pagination.perPage;
  const indexLastUser = pagination.page * pagination.perPage;
  const dataPage = allUsers.slice(indexFirstUser, indexLastUser);

  const handleNext = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  const handleBack = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  useEffect(() => {
    handleDataUser();
  }, [pagination.totalPage]);

  useEffect(() => {
    allPage();
  }, [allUsers]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center self-end justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-screen font-poppins text-slate-100 overflow-auto ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left text-white underline font-playfair-display underline-offset-8">
            All User
          </h1>
          <Table>
            <TableHeader className="bg-skyward-tertiary">
              <TableRow className="text-left">
                <TableHead>Picture</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataPage.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-skyward-primary/20"
                      : "bg-skyward-primary/5"
                  }`}
                >
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.profilePictureUrl} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span>{user.role}</span>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2 text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/dashboard/all-user/${user.id}`}>
                            <FilePen color="orange" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex gap-3">
            <div className="flex">
              <ChevronsLeft
                onClick={() => setPagination({ ...pagination, page: 1 })}
                className="cursor-pointer"
              />
              <button
                disabled={pagination.page === 1}
                className="disabled:cursor-not-allowed"
                onClick={handleBack}
              >
                <ChevronLeft />
              </button>
            </div>
            <span>
              {pagination.page} of {pagination.totalPage}
            </span>
            <div className="flex">
              <button
                disabled={pagination.page === pagination.totalPage}
                className="disabled:cursor-not-allowed"
                onClick={handleNext}
              >
                <ChevronRight />
              </button>
              <ChevronsRight
                className="cursor-pointer"
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.totalPage })
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllUser;
