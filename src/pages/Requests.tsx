import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  useCheckoutBookMutation,
  useGetRequestsByStatusQuery,
} from "../redux/features/book/bookApi";
import Loader from "../components/Loader";
import { styles } from "../styles";
import { IoMdEye } from "react-icons/io";
import { FaThumbsUp, FaCheckCircle } from "react-icons/fa";
import { Pagination } from "antd";
import { formatDate } from "../utils/utilityFunctions";
import ApproveRequestPopup from "../components/ApproveRequestPopup";
import CustomModal from "../utils/CustomModal";
import { mapAuthorsToString } from "../utils/bookUtils";
import toast from "react-hot-toast";

const Requests = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState(false);
  const [approve, setApprove] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [book, setBook] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeItem, setActiveItem] = useState(1);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Approved"); // Changed variable name to camelCase

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

  const handleApprovePopUp = (book: any) => {
    setBook(book);
    setApprove(true);
  };

  const handleCheckoutPopUp = (book: any) => {
    setBook(book);
    setCheckout(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {approve && (
        <CustomModal
          open={approve}
          setOpen={setApprove}
          Component={ApproveRequestPopup}
          itemData={book}
          refetch={refetch}
        />
      )}
      {checkout && (
        <CustomModal
          open={checkout}
          setOpen={setCheckout}
          Component={CheckoutBooks}
          itemData={book}
          refetch={refetch}
        />
      )}
      <div className="flex p-4 gap-4">
        {/* Buttons for each status */}
        <button
          onClick={() => handleStatusChange("Pending")}
          className={`${
            status == "Pending" && "border-b-4 border-b-yellow-600"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => handleStatusChange("Approved")}
          className={`${
            status == "Approved" && "border-b-4 border-b-yellow-600"
          }`}
        >
          Approved
        </button>
      </div>
      {/* Display data based on status */}
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
              <th
                className={`${styles.wide_tb_th} border-y ${
                  status == "Pending" && "hidden"
                }`}
              >
                Approved Date
              </th>
              {/* <th
                className={`${styles.wide_tb_th} border-y ${
                  status == "Pending" && "hidden"
                }`}
              >
                In Date
              </th> */}
              {/* <th
                className={`${styles.wide_tb_th} border-y ${
                  status == "Pending" && "hidden"
                }`}
              >
                Out Date
              </th> */}
              <th className={`${styles.wide_tb_th} border-y`}>Status</th>
              <th className={`${styles.wide_tb_th} border-y`}>
                Available Stock
              </th>
              {/* <th
                className={`${styles.wide_tb_th} border-y ${
                  status == "Pending" && "hidden"
                }`}
              >
                Fine
              </th> */}
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
                  <td className="text-center py-3">
                    {book?.userId?.index_no || "Kojo Larbi"}
                  </td>
                  <td className="text-center py-3">
                    {book?.userId?.first_name + " " + book?.userId?.surname ||
                      ""}
                  </td>
                  <td className="text-center py-3">
                    {(book?.bookId && mapAuthorsToString(book?.bookId)) || ""}
                  </td>
                  <td className="text-center py-3">{book?.bookId?.title}</td>

                  <td className="text-center py-3">
                    {formatDate(book?.requestDate)}
                  </td>
                  <td
                    className={`text-center py-3 ${
                      status == "Pending" && "hidden"
                    }`}
                  >
                    {book?.approveDate && formatDate(book?.approveDate)}
                  </td>
                  {/* <td
                    className={`text-center py-3 ${
                      status == "Pending" && "hidden"
                    }`}
                  >
                    {book?.inDate && formatDate(book?.inDate)}
                  </td> */}
                  {/* <td
                    className={`text-center py-3 ${
                      status == "Pending" && "hidden"
                    }`}
                  >
                    {book?.outDate && formatDate(book?.outDate)}
                  </td> */}
                  <td className="text-center py-3">{book?.status}</td>
                  <td className="text-center py-3">
                    {book?.bookId?.availableStock}
                  </td>
                  {/* <td
                    className={`text-center py-3 ${
                      status == "Pending" && "hidden"
                    }`}
                  >
                    {book?.fine}
                  </td> */}
                  <td className="text-center p-[10px]">
                    <span className="flex items-center justify-center gap-4">
                      <button
                        className={`${
                          status !== "Approved" && "hidden"
                        } border border-green-500 text-green-500 hover:text-[#6c757d] flex justify-center items-center py-[5px] px-3 rounded-full hover:bg-green-500 transition-all duration-300 cursor-pointer`}
                        title="Checkout"
                        onClick={() => handleCheckoutPopUp(book)}
                      >
                        <FaCheckCircle size={14} className="" />
                      </button>
                      <button
                        className={`${
                          status === "Approved" && "hidden"
                        } border border-green-500 text-green-500 hover:text-[#6c757d] flex justify-center items-center py-[5px] px-3 rounded-full hover:bg-green-500 transition-all duration-300 cursor-pointer`}
                        title="Approve"
                        onClick={() => handleApprovePopUp(book)}
                      >
                        <FaThumbsUp size={14} className="" />
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

const CheckoutBooks = ({ itemData, setOpen, refetch }: any) => {
  const [checkoutBook, { data, isLoading, isSuccess, error }] =
    useCheckoutBookMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const [inPrevDate, setInPrevDate] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCancelRequest = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirmRequest = async (e: any) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("Verify ID to proceed");
      return;
    }
    await checkoutBook({
      requestId: itemData?._id,
      patronId: user?._id,
      inPrevDate,
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
            Checkout{" "}
            <span className="font-bold">{itemData?.bookId?.title}</span>
          </p>
          <label htmlFor="inPrevDate">Returning date</label>
          <input
            type="date"
            name="inPrevDate"
            value={inPrevDate}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            onChange={(e) => setInPrevDate(e.target.value)}
            placeholder=""
          />
          <br />
          <div>
            <label htmlFor="verifyId" className="flex items-center mt-3">
              <input
                type="checkbox"
                id="verifyId"
                checked={isChecked}
                required
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Verify ID
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
export default Requests;
