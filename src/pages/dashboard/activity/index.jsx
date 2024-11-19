import Sidebar from "@/components/Layout/Sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { ACTIVITIES, DELETE_ACTIVITY } from "@/pages/api/activity";
import { API_KEY, BASE_URL } from "@/pages/api/config";
import axios from "axios";
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
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const allPage = () => {
    setPagination({
      ...pagination,
      totalPage: Math.ceil(dataActivity.length / pagination.perPage),
    });
  };

  const nextPage = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  const prevPage = () => {
    setPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  const firstIndex = pagination.page * pagination.perPage - pagination.perPage;
  const lastIndex = pagination.page * pagination.perPage;
  const dataActivitiesPage = dataActivity.slice(firstIndex, lastIndex);

  const deleteActivity = (id) => {
    const config = {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        });
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
  }, [pagination.totalPage]);

  useEffect(() => {
    allPage();
  }, [dataActivity]);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex flex-col items-center justify-center w-full h-screen text-white bg-slate-800">
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left text-white underline underline-offset-8">
            Activities List
          </h1>

          <div>
            <Link
              href={"/dashboard/activity/create-activity"}
              className="flex justify-end w-full"
            >
              <Button variant="secondary">Create Activity</Button>
            </Link>
          </div>

          <Table>
            <TableHeader className="bg-skyward-tertiary">
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

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <span onClick={() => deleteActivity(item.id)}>
                            <Trash2 color="#f54531" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
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
                onClick={prevPage}
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
                onClick={nextPage}
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
