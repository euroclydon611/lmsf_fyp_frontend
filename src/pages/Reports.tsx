import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  useCheckInBookMutation,
  useGetRequestsByStatusQuery,
} from "../redux/features/book/bookApi";
import Loader from "../components/Loader";
import { styles } from "../styles";
import { Pagination } from "antd";
import { formatDate } from "../utils/utilityFunctions";
import CustomModal from "../utils/CustomModal";
import { BiExport } from "react-icons/bi";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import toast from "react-hot-toast";
import { mapAuthorsToString } from "../utils/bookUtils";
import axios from "axios";

const Reports = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState(false);
  const [bring, setBring] = useState(false);
  const [book, setBook] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeItem, setActiveItem] = useState(2);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Out");

  const { data, isLoading, refetch } = useGetRequestsByStatusQuery({
    status: status,
    userId: user?._id,
  });

  console.log(data?.requests);

  // Function to handle status change
  const handleStatusChange = (newStatus: any) => {
    setStatus(newStatus);
  };

  const handleChangePage = (page: any) => {
    setPage(page);
  };

  const handleBringBook = (book: any) => {
    setBook(book);
    setBring(true);
  };
  const exportData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_PUBLIC_SERVER_URI
        }/export-request?status=${status}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${status} books.xlsx`;
      link.click();
    } catch (error) {
      console.error("Error during export:", error);
      toast.error("Error during export");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {bring && (
        <CustomModal
          open={bring}
          setOpen={setBring}
          Component={CheckInBook}
          itemData={book}
          refetch={refetch}
        />
      )}
      {/* <div className="w-full  block 800px:flex items-center gap-5">
        <div className="w-full mb-4 800px:w-[20%] min-h-[10vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Requested Books
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{23}</h5>
        </div>

        <div className="w-full mb-4 800px:w-[20%] min-h-[10vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <h3
              className={`!text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Checkout Books
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{20}</h5>
        </div>
      </div> */}
      <div className="flex p-4 gap-4">
        {/* Buttons for each status */}
        <button
          onClick={() => handleStatusChange("In")}
          className={`${status == "In" && "border-b-4 border-b-yellow-600"}`}
        >
          Checked In{" "}
        </button>
        <button
          onClick={() => handleStatusChange("Out")}
          className={`${status == "Out" && "border-b-4 border-b-yellow-600"}`}
        >
          Checked Out
        </button>
        <button
          onClick={() => handleStatusChange("Overdue")}
          className={`${
            status == "Overdue" && "border-b-4 border-b-yellow-600"
          }`}
        >
          Overdue
        </button>
      </div>
      {/* Display data based on status */}
      <div className="flex justify-between mb-2 max-sm:flex-wrap gap-2">
        <div className="flex gap-1 items-center">
          <span className="max-md:hidden">Show</span>
          <select
            name="limit"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className={`text-[14px] px-[1rem] py-[0.2rem] border border-gray-400 rounded-[0.25rem] shadow-md placeholder-[#8391a2] focus:ring-[0.3px] focus:ring-gray-300 focus:border-gray-500`}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="max-md:hidden">entries</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden">
            <input
              type="text"
              name="publisher"
              value={searchTerm}
              className="appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
          </div>
          <select name="" id="" className={`${styles.input} !w-[100px] hidden`}>
            <option value="">Filter</option>
          </select>
          <button
            className="flex mr-2 items-center justify-center gap-1 bg-[#39afd1] text-white py-[7.2px] px-[14.4px] max-md:px-[10px] shadow-md rounded-sm focus:ring-2 focus:ring-[#39afd1] hover:bg-[#2c8eae] transition-all duration-300"
            onClick={exportData}
          >
            <BiExport size={15} />
            <span className="max-md:hidden">Export</span>
          </button>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto bg-white rounded-sm shadow-sm">
        <table className="table-auto w-full bg-white">
          <thead className="sticky -top-1 text-[14.4px] z-[9] bg-slate-100">
            <tr>
              <th className={`min-w-[50px]`}>No</th>
              <th className={`${styles.wide_tb_th} border-y`}>Student ID</th>
              <th className={`${styles.wide_tb_th} border-y`}>Name</th>
              <th className={`${styles.wide_tb_th} border-y`}>Title</th>
              <th className={`${styles.wide_tb_th} border-y`}>Author(s)</th>
              <th className={`${styles.wide_tb_th} border-y`}>
                Requested Date
              </th>
              <th className={`${styles.wide_tb_th} border-y`}>Approved Date</th>
              {status !== "Out" && (
                <th className={`${styles.wide_tb_th} border-y`}>In Date</th>
              )}
              <th className={`${styles.wide_tb_th} border-y`}>Out Date</th>
              <th className={`${styles.wide_tb_th} border-y`}>
                Returning Date
              </th>
              <th className={`${styles.wide_tb_th} border-y`}>Status</th>
              <th className={`${styles.wide_tb_th} border-y`}>
                Available Stock
              </th>
              <th className={`${styles.wide_tb_th} border-y`}>Fine</th>
              <th className={`${styles.wide_tb_th} border-y`}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.requests && data?.requests.length > 0 ? (
              data?.requests?.map((book: any, i: any) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="text-center p-[10px]">
                    {(page - 1) * limit + i + 1}
                  </td>
                  <td className="text-center py-3">{book?.userId?.index_no}</td>
                  <td className="text-center py-3">
                    {book?.userId?.first_name + " " + book?.userId?.surname ||
                      ""}
                  </td>
                  <td className="text-center py-3">{book?.bookId?.title}</td>
                  <td className="text-center py-3">
                    {(book?.bookId && mapAuthorsToString(book?.bookId)) || ""}
                  </td>
                  <td className="text-center py-3">
                    {formatDate(book?.requestDate)}
                  </td>
                  <td className="text-center py-3">
                    {book?.approveDate && formatDate(book?.approveDate)}
                  </td>
                  {status !== "Out" && (
                    <td className="text-center py-3">
                      {book?.inDate && formatDate(book?.inDate)}
                    </td>
                  )}
                  <td className="text-center py-3">
                    {book?.outDate && formatDate(book?.outDate)}
                  </td>
                  <td className="text-center py-3">
                    {book?.inPrevDate && formatDate(book?.inPrevDate)}
                  </td>
                  <td className="text-center py-3">{book?.status}</td>
                  <td className="text-center py-3">
                    {book?.bookId?.availableStock}
                  </td>
                  <td className="text-center py-3">{book?.fine || "-"}</td>
                  <td className="text-center p-[10px]">
                    <span className="flex items-center justify-center gap-4">
                      <button
                        className={`${
                          status === "Approved" && "hidden"
                        } border border-green-500 text-green-500 hover:text-[#6c757d] flex justify-center items-center py-[5px] px-3 rounded-full hover:bg-green-500 transition-all duration-300 cursor-pointer`}
                        title="Approve"
                        onClick={() => handleBringBook(book)}
                      >
                        <MdOutlineAssignmentReturn size={20} className="" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border-y text-center py-2" colSpan={12}>
                  <span className="text-red-500 font-extrabold">
                    No results found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex  mt-4 justify-end">
        <Pagination
          current={page}
          pageSize={limit}
          total={1}
          onChange={handleChangePage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

const CheckInBook = ({ itemData, setOpen, refetch }: any) => {
  const [checkoutIn, { data, isLoading, isSuccess, error }] =
    useCheckInBookMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [inPrevDate, setInPrevDate] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  console.log("Data", itemData);

  const handleCancelRequest = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirmRequest = async (e: any) => {
    e.preventDefault();
    if (itemData?.fine > 0 && !isChecked) {
      toast.error("Pay fine to proceed");
      return;
    }
    await checkoutIn({
      requestId: itemData?._id,
      patronId: user?._id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message, { duration: 5000 });
      setOpen(false);
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message, { duration: 5000 });
      }
    }
  }, [isSuccess, error]);

  return (
    <div>
      <div>
        <div className="">
          <p className="text-center">
            Check In{" "}
            <span className="font-bold">{itemData?.bookId?.title}</span>
          </p>

          <br />
          <div
            className={`${
              itemData?.fine < 0 || (itemData?.fine == null && "hidden")
            }`}
          >
            <label htmlFor="verifyId" className="flex items-center  mt-3">
              <input
                type="checkbox"
                id="verifyId"
                checked={isChecked}
                required
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Fine Paid
            </label>
          </div>
          <div className="flex justify-center items-center mt-3 gap-3">
            <button
              onClick={handleConfirmRequest}
              className="bg-gray-800 text-yellow-600 font-bold px-3 py-2"
            >
              {isLoading ? "Wait..." : "Yes"}
            </button>
            <button
              onClick={handleCancelRequest}
              className="bg-yellow-600 text-gray-800 font-bold px-3 py-2"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
