import Sidebar from "@/components/Layout/Sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActivityContext } from "@/contexts/activityContext";
import { CategoryContext } from "@/contexts/categoryContext";
import { IsOpenContext } from "@/contexts/isOpen";
import { DELETE_ACTIVITY } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FilePen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Activity = () => {
  const { dataActivity, handleDataActivity } = useContext(ActivityContext);
  const { dataCategory, handleDataCategory } = useContext(CategoryContext);
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isOpen } = useContext(IsOpenContext);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const filteredActivity = dataActivity
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((activity) => {
      const searchActivity = activity.title
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const filterStatus = statusFilter
        ? activity.category?.id === statusFilter
        : true;

      return searchActivity && filterStatus;
    });

  const handleChangeName = (searchName) => {
    setSearchName(searchName);

    // Reset halaman ke 1 ketika filter berubah
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleChangeFilterStatus = (selectedStatus) => {
    setStatusFilter(selectedStatus === "all" ? "" : selectedStatus);

    // Reset halaman ke 1 ketika filter berubah
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const calculateTotalPages = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(filteredActivity.length / pagination.perPage),
    });
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

  const handleChangePerPage = (perPage) => {
    setPagination({
      ...pagination,
      perPage: perPage,
    });
  };

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

  const firstIndex = pagination.page * pagination.perPage - pagination.perPage;
  const lastIndex = pagination.page * pagination.perPage;
  const dataActivitiesPage = filteredActivity.slice(firstIndex, lastIndex);

  const deleteActivity = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${getCookie("token")}`,
      },
    };

    axios
      .delete(`${BASE_URL + DELETE_ACTIVITY + id}`, config)
      .then((res) => {
        toast.success("Delete Data Successfully", {
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
        const updatedActivity = dataActivity.filter(
          (activity) => activity.id !== id
        );
        handleDataActivity(updatedActivity);
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    handleDataActivity();
    handleDataCategory();
  }, []);

  useEffect(() => {
    calculateTotalPages();
  }, [searchName, pagination.perPage, dataActivity, statusFilter]);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full min-h-screen py-5 font-poppins text-slate-800 overflow-auto ease-linear duration-300 `}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left underline text-slate-800 font-playfair-display underline-offset-8">
            Activities List
          </h1>

          <div className="flex justify-between">
            <Input
              type="text"
              placeholder="Search by title"
              className="w-56 placeholder:text-slate-400"
              onChange={(e) => handleChangeName(e.target.value)}
            />
            <Select onValueChange={handleChangeFilterStatus}>
              <SelectTrigger className="w-44 ">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {dataCategory.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href={"/dashboard/activity/create-activity"}>
              <Button variant="secondary">Create Activity</Button>
            </Link>
          </div>

          <Table>
            <TableHeader className="bg-skyward-primary">
              <TableRow className="text-left">
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataActivitiesPage.map((item, index) => (
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
                      <AvatarImage src={item.imageUrls[0]} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category?.name}</TableCell>
                  {item.price && (
                    <TableCell>Rp. {item.price.toLocaleString("id")}</TableCell>
                  )}
                  <TableCell className="flex justify-end gap-2 text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/dashboard/activity/${item.id}`}>
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
                              Are you sure want to delete this activity?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={() => deleteActivity(item.id)}>
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
                  <SelectItem value={15}>15</SelectItem>
                  <SelectItem value={20}>20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </main>
    </div>
    // <div>
    //   <Link href="/dashboard/activity/create-activity">
    //     <button>Create</button>
    //   </Link>
    //   {dataActivity.map((activity) => (
    //     <div key={activity.id}>
    //       <img
    //         src={activity.imageUrls[activity.imageUrls.length - 1]}
    //         alt={activity.title}
    //         className="w-24 aspect-square"
    //       />
    //       <h1>{activity.title}</h1>
    //       <p>{activity.category.name}</p>
    //       <Link href={`/dashboard/activity/edit-activity/${activity.id}`}>
    //         <button>Detail</button>
    //       </Link>
    //       <button onClick={() => deleteActivity(activity.id)}>Delete</button>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Activity;
