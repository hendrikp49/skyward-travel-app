import Sidebar from "@/components/Layout/Sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { IsOpenContext } from "@/contexts/isOpen";
import { TransactionContext } from "@/contexts/transactionContext";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FilePen,
} from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const AllTransaction = () => {
  const { isOpen } = useContext(IsOpenContext);
  const { allTransaction, handleAllTransaction } =
    useContext(TransactionContext);
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTransactions = allTransaction.filter((transaction) =>
    statusFilter ? transaction.status === statusFilter : true
  );

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 7,
    totalPage: 0,
  });

  const calculateTotalPages = () => {
    setPagination((prev) => ({
      ...prev,
      totalPage: Math.ceil(filteredTransactions.length / prev.perPage),
    }));
  };

  const firstIndexData = (pagination.page - 1) * pagination.perPage;
  const lastIndexData = pagination.page * pagination.perPage;
  const dataPage = filteredTransactions.slice(firstIndexData, lastIndexData);

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    // Reset halaman ke 1 ketika filter berubah
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
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

  useEffect(() => {
    calculateTotalPages();
  }, [statusFilter]);

  useEffect(() => {
    handleAllTransaction();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-screen font-poppins text-slate-100 overflow-auto py-2 ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left text-white underline font-playfair-display underline-offset-8">
            Transaction List
          </h1>

          <div className="text-right">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="p-2 text-sm rounded-md text-slate-800 bg-slate-100"
            >
              <option disabled>Filter by Status</option>
              <option value="">All</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Canceled</option>
            </select>
          </div>

          <Table>
            <TableHeader className="bg-skyward-tertiary">
              <TableRow className="text-left">
                <TableHead>Inv. Number</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Total Transaction</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>{user.invoiceId}</TableCell>
                  <TableCell>{user.payment_method?.name}</TableCell>
                  <TableCell>
                    {user.totalAmount &&
                      user.totalAmount.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="flex justify-end gap-2 text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={`/dashboard/transaction/${user.id}`}>
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
    // <div>
    //   {dataPage.map((data) => (
    //     <div key={data.id} className="space-y-2 border">
    //       <p>{data.invoiceId}</p>
    //       <p>{data.orderDate}</p>
    //       <img
    //         src={data.payment_method.imageUrl}
    //         alt={data.payment_method.name}
    //       />
    //       <p>{data.totalAmount}</p>
    //       <Link href={`/dashboard/transaction/${data.id}`}>
    //         <button>Detail</button>
    //       </Link>
    //     </div>
    //   ))}
    //   <button disabled={pagination.page === 1} onClick={handleBack}>
    //     prev
    //   </button>
    //   <button
    //     disabled={pagination.page === pagination.total_Page}
    //     onClick={handleNext}
    //   >
    //     next
    //   </button>
    // </div>
  );
};

export default AllTransaction;
