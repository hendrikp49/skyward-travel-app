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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FilePen,
  User,
} from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IsOpenContext } from "@/contexts/isOpen";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const AllUser = () => {
  const router = useRouter();
  const { isOpen } = useContext(IsOpenContext);
  const { allUsers, handleDataUser } = useContext(AllUserContext);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const filteredUsers = allUsers
    .filter((user) => {
      const filterRole = statusFilter ? user.role === statusFilter : true;
      const findName = user.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      return filterRole && findName;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const calculateTotalPages = () => {
    setPagination((prev) => ({
      ...prev,
      totalPage: Math.ceil(filteredUsers.length / prev.perPage),
    }));
  };

  const handleChangeRole = (selectedStatus) => {
    setStatusFilter(selectedStatus === "all" ? "" : selectedStatus);

    // Reset halaman ke 1 ketika filter berubah
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleChangeName = (searchName) => {
    setSearchName(searchName);

    // Reset halaman ke 1 ketika filter berubah
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleChangePerPage = (page) => {
    setPagination((prev) => ({
      ...prev,
      perPage: page,
    }));
  };

  const handleChangePage = (e) => {
    setPagination((prev) => ({
      ...prev,
      page:
        !e.target.value || e.target.value === 0 || isNaN(e.target.value)
          ? 1
          : parseInt(e.target.value),
    }));
  };

  const firstIndexData = (pagination.page - 1) * pagination.perPage;
  const lastIndexData = pagination.page * pagination.perPage;
  const dataPage = filteredUsers.slice(firstIndexData, lastIndexData);

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
  }, []);

  useEffect(() => {
    calculateTotalPages();
  }, [statusFilter, searchName, pagination.perPage, pagination.page, allUsers]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center self-end justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full min-h-screen py-5 font-poppins text-slate-100 overflow-auto ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left text-white underline font-playfair-display underline-offset-8">
            All User
          </h1>

          <div className="flex justify-between">
            <Input
              type="text"
              placeholder="Search by name"
              className="w-56 placeholder:text-slate-400"
              onChange={(e) => handleChangeName(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={handleChangeRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Role</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="secondary"
              onClick={() => router.push("/dashboard/all-user/create-user")}
            >
              Create New User
            </Button>
          </div>

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
                      <AvatarImage
                        src={user.profilePictureUrl}
                        alt={user.name}
                      />

                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
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
                        <TooltipContent>Edit Role</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between">
            <div className="flex items-center gap-3">
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
              <div className="space-x-1">
                <input
                  type="text"
                  value={pagination.page}
                  onChange={handleChangePage}
                  className="w-5 text-center bg-transparent outline-none"
                />
                <span>of {pagination.totalPage}</span>
              </div>
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

            <div className="flex items-center gap-3">
              <span className="text-sm font-light">Data per Page</span>
              <Select
                value={pagination.perPage}
                onValueChange={handleChangePerPage}
              >
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={5}>5</SelectItem>
                    <SelectItem value={10}>10</SelectItem>
                    <SelectItem value={15}>15</SelectItem>
                    <SelectItem value={20}>20</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllUser;
