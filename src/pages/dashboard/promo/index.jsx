import { useContext, useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../../api/config";
import axios from "axios";
import { DELETE_PROMO, PROMO } from "../../api/promo";
import Link from "next/link";
import { PromoContext } from "@/contexts/promoContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Layout/Sidebar";
import { Button } from "@/components/ui/button";
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
import { getCookie } from "cookies-next";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { IsOpenContext } from "@/contexts/isOpen";

const Promo = () => {
  const { dataPromo, handleDataPromo } = useContext(PromoContext);
  const { isOpen } = useContext(IsOpenContext);
  const [openModal, setOpenModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const allPage = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(dataPromo.length / pagination.perPage),
    });
  };

  const firstIndexData =
    pagination.page * pagination.perPage - pagination.perPage;
  const lastIndexData = pagination.page * pagination.perPage;
  const dataPromoPage = dataPromo.slice(firstIndexData, lastIndexData);

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

  const deleteData = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_PROMO + id}`, config)
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
          setOpenModal(false);
        }, 1000);
        const updatedPromo = dataPromo.filter((promo) => promo.id !== id);
        handleDataPromo(updatedPromo);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    handleDataPromo();
  }, [pagination.totalPage]);

  useEffect(() => {
    allPage();
  }, [dataPromo]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-screen font-poppins text-slate-100 overflow-auto ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left text-white underline font-playfair-display underline-offset-8">
            Promo List
          </h1>

          <div>
            <Link
              href={"/dashboard/promo/create-promo"}
              className="flex justify-end w-full"
            >
              <Button variant="secondary">Create Promo</Button>
            </Link>
          </div>

          <Table>
            <TableHeader className="bg-skyward-tertiary">
              <TableRow className="text-left">
                <TableHead>Picture</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Promo Code</TableHead>
                <TableHead>Discount Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataPromoPage.map((item, index) => (
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
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.promo_code}</TableCell>
                  {item.promo_discount_price && (
                    <TableCell>
                      Rp. {item.promo_discount_price.toLocaleString("id")}
                    </TableCell>
                  )}
                  <TableCell className="flex justify-end gap-2 text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/dashboard/promo/${item.id}`}>
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
                              Are you sure want to delete this promo?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => deleteData(item.id)}>
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

export default Promo;
