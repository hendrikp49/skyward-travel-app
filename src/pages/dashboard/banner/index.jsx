import { API_KEY } from "@/pages/api/config";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "@/pages/api/config";
import Link from "next/link";
import { DELETE_BANNER } from "@/pages/api/banner";
import Sidebar from "@/components/Layout/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BannerContext } from "@/contexts/bannerContext";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { IsOpenContext } from "@/contexts/isOpen";

const Banner = () => {
  const { dataBanner, handleDataBanner } = useContext(BannerContext);
  const { isOpen } = useContext(IsOpenContext);
  const [openModal, setOpenModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const deleteBanner = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_BANNER + id}`, config)
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
        setOpenModal(false);
        const updatedBanner = dataBanner.filter((banner) => banner.id !== id);
        handleDataBanner(updatedBanner);
      })
      .catch((err) => console.log(err.response));
  };

  const allPage = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(dataBanner.length / pagination.perPage),
    });
  };

  const indexFirstUser =
    pagination.page * pagination.perPage - pagination.perPage;
  const indexLastUser = pagination.page * pagination.perPage;
  const dataPage = dataBanner.slice(indexFirstUser, indexLastUser);

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
    handleDataBanner();
  }, [pagination.totalPage]);

  useEffect(() => {
    allPage();
  }, [dataBanner]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center self-end justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-screen font-poppins text-slate-100 ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl">
          <h1 className="w-full text-3xl font-bold text-left text-white underline font-playfair-display underline-offset-8">
            Banner List
          </h1>

          <div>
            <Link
              href={"/dashboard/banner/create-banner"}
              className="flex justify-end w-full"
            >
              <Button variant="secondary">Create Banner</Button>
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
                          <Link href={`/dashboard/banner/${item.id}`}>
                            <button>
                              <FilePen color="orange" />
                            </button>
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
                              Are you sure want to delete this banner?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => deleteBanner(item.id)}>
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

          {/* <Dialog>
                      <DialogTrigger asChild></DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild></DialogClose>
                          
                        </DialogFooter>
                      </DialogContent>
                    </Dialog> */}

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

export default Banner;
