import { API_KEY } from "@/pages/api/config";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "@/pages/api/config";
import Link from "next/link";
import { CATEGORY, DELETE_CATEGORY } from "@/pages/api/category";
import { CategoryContext } from "@/contexts/categoryContext";
import Sidebar from "@/components/Layout/Sidebar";
import { toast } from "react-toastify";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FilePen,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IsOpenContext } from "@/contexts/isOpen";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Category = () => {
  const { dataCategory, handleDataCategory } = useContext(CategoryContext);
  const [searchName, setSearchName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isOpen } = useContext(IsOpenContext);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const filteredCategory = dataCategory
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((category) =>
      category.name.toLowerCase().includes(searchName.toLowerCase())
    );

  const calculateTotalPages = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(filteredCategory.length / pagination.perPage),
    });
  };

  const handleChangeName = (value) => {
    setSearchName(value);

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

  const indexFirstUser =
    pagination.page * pagination.perPage - pagination.perPage;
  const indexLastUser = pagination.page * pagination.perPage;
  const dataPage = filteredCategory.slice(indexFirstUser, indexLastUser);

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

  const deleteCategory = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_CATEGORY + id}`, config)
      .then((res) => {
        toast.success("Data deleted successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          setOpenModal;
        }, 1000);
        handleDataCategory();
      })
      .catch((err) => {
        toast.error(
          "This Category can't be deleted because it has been used in cart",
          {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setTimeout(() => {
          setOpenModal(false);
        }, 1000);
      });
  };

  useEffect(() => {
    handleDataCategory();
  }, []);

  useEffect(() => {
    calculateTotalPages();
  }, [dataCategory, pagination.perPage, pagination.page, searchName]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full min-h-screen py-5 font-poppins text-slate-100 ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left text-white underline font-playfair-display underline-offset-8">
            Category List
          </h1>

          <div className="flex justify-between">
            <Input
              type="text"
              placeholder="Search by name"
              className="w-56 placeholder:text-slate-400"
              onChange={(e) => handleChangeName(e.target.value)}
            />
            <Link href={"/dashboard/category/create-category"}>
              <Button variant="secondary">Create Category</Button>
            </Link>
          </div>

          <Table>
            <TableHeader className="bg-skyward-tertiary">
              <TableRow className="text-left">
                <TableHead>Picture</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataPage.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-skyward-primary/20"
                      : "bg-skyward-primary/5"
                  }`}
                >
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={item.imageUrl} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="flex justify-end gap-2 text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/dashboard/category/${item.id}`}>
                            <FilePen color="orange" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Dialog>
                      <DialogTrigger onClick={() => setOpenModal(true)}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button>
                                <Trash2 color="#f54531" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      {openModal && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Are you sure want to delete this promo?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => deleteCategory(item.id)}>
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
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
                  <SelectItem value={5}>5</SelectItem>
                  <SelectItem value={10}>10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Category;
