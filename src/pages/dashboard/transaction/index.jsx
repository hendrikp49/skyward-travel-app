import Sidebar from "@/components/Layout/Sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { IsOpenContext } from "@/contexts/isOpen";
import { TransactionContext } from "@/contexts/transactionContext";
import {
  BookText,
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
  const [searchInvoice, setSearchInvoice] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalPage: 0,
  });

  const filteredTransactions = allTransaction
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .filter((transaction) => {
      const filterStatus = statusFilter
        ? transaction.status === statusFilter
        : true;
      const findInvoice = transaction.invoiceId
        .toLowerCase()
        .includes(searchInvoice.toLowerCase());

      return filterStatus && findInvoice;
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

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value === "all" ? "" : value);

    // Reset halaman ke 1 ketika filter berubah
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleSearchInvoice = (value) => {
    setSearchInvoice(value);

    // Reset halaman ke 1 ketika pencarian berubah
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
  }, [statusFilter, searchInvoice, pagination.perPage, allTransaction]);

  useEffect(() => {
    handleAllTransaction();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main
        className={`flex flex-col items-center justify-center w-full ${
          isOpen ? "ml-[208px]" : "ml-[63px]"
        }  h-full min-h-screen font-poppins text-slate-100 overflow-auto py-10 ease-linear duration-300 bg-slate-800`}
      >
        <div className="w-full max-w-sm px-5 mx-auto space-y-10 duration-200 ease-in-out md:max-w-xl lg:max-w-4xl min-w-fit">
          <h1 className="w-full text-3xl font-bold text-left text-white underline font-playfair-display underline-offset-8">
            Transaction List
          </h1>

          <div className="flex justify-between text-right">
            <Input
              type="text"
              placeholder="Search by Inv. Number"
              className="w-56 placeholder:text-slate-400"
              onChange={(e) => handleSearchInvoice(e.target.value)}
            />
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Canceled</SelectItem>
              </SelectContent>
            </Select>
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
                            <BookText color="orange" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Detail Transaction</TooltipContent>
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
