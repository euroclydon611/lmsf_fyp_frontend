import { useEffect, useState } from "react";
import { LiaPlusSquareSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { styles } from "../styles";
import { Pagination } from "antd";
import CustomModal from "../utils/CustomModal";
import CreateBook from "../components/book/CreateBook";
import {
  useGetAllBooksQuery,
  useGetRequestsByStatusQuery,
} from "../redux/features/book/bookApi";
import Loader from "../components/Loader";
import { FaEdit } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import BookInfo from "../components/book/BookInfo";

export interface IBook {
  cover: string;
  title: string;
  authors: string[];
  description: string;
  publicationDate: Date;
  publisher: string;
  pages: number;
  category: string;
  totalStock: number;
  availableStock: number;
  patronId: string;
  createdAt: Date;
  updatedAt: Date;
  patron: any;
}

const AllBooks = () => {
  const [view, setView] = useState(false);
  const [add, setAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [book, setBook] = useState<any>([]);
  const [status, setStatus] = useState("Out");
  const { user } = useSelector((state: RootState) => state.auth);

  const { data } = useGetRequestsByStatusQuery({
    status: status,
    userId: user?._id,
  });

  console.log(data?.requests?.length);

  const {
    data: booksData,
    isLoading: booksLoading,
    refetch,
  } = useGetAllBooksQuery({ page, limit, searchTerm, sortField, sortOrder });

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        await refetch();
      } catch (error) {
        console.error("Error fetching  data:", error);
      }
    };

    fetchBooksData();
  }, [page, limit, searchTerm, sortField, sortOrder, refetch]);

  const handleChangePage = (page: any) => {
    setPage(page);
  };

  const handleViewBook = (book: any) => {
    setBook(book);
    setView(true);
  };

  if (booksLoading) {
    return <Loader />;
  }
  return (
    <>
      {add && (
        <CustomModal
          open={add}
          setOpen={setAdd}
          Component={CreateBook}
          refetch={refetch}
        />
      )}

      {view && <BookInfo open={view} setOpen={setView} data={book} />}

      <div className="w-full block 800px:flex items-center gap-5 p-3">
        <div className="w-full mb-4 800px:w-[20%] min-h-[10vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Books
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {booksData?.response?.totalCount || 0}
          </h5>
        </div>

        <div className="w-full mb-4 800px:w-[20%] min-h-[10vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <h3
              className={`!text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Checkout Books
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {data?.requests?.length || 0}
          </h5>
        </div>
      </div>

      <div className="bg-white mt-5 p-4">
        <h1 className="text-[18px] mb-3 font-bold">All books</h1>
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
            <div>
              <input
                type="text"
                name="publisher"
                value={searchTerm}
                className="appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
              />
            </div>
            <select
              name=""
              id=""
              className={`${styles.input} !w-[100px] hidden`}
            >
              <option value="">Filter</option>
            </select>
            <button
              className="flex items-center justify-center gap-1 bg-[#39afd1] text-white py-[7.2px] px-[14.4px] max-md:px-[10px] shadow-md rounded-sm focus:ring-2 focus:ring-[#39afd1] hover:bg-[#2c8eae] transition-all duration-300"
              onClick={() => setAdd(true)}
            >
              <LiaPlusSquareSolid size={15} />
              <span className="max-md:hidden">New</span>
            </button>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto bg-white rounded-sm shadow-sm">
          <table className="table-auto w-full bg-white">
            <thead className="sticky -top-1 text-[14.4px] z-[9] bg-slate-100">
              <tr>
                <th className={`min-w-[50px]`}>No</th>
                <th className={`${styles.wide_tb_th} border-y`}>Added By</th>
                <th className={`${styles.wide_tb_th} border-y`}>Title</th>
                <th className={`${styles.wide_tb_th} border-y`}>Author</th>
                <th className={`${styles.wide_tb_th} border-y`}>Category</th>
                <th className={`${styles.wide_tb_th} border-y`}>Publisher</th>
                <th className={`${styles.wide_tb_th} border-y`}>Stock</th>
                <th className={`${styles.wide_tb_th} border-y`}>
                  Available Stock
                </th>

                <th className={`${styles.wide_tb_th} border-y`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {booksData?.response?.books ? (
                booksData?.response?.books?.map((book: IBook, i: any) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="text-center p-[10px]">
                      {(page - 1) * limit + i + 1}
                    </td>
                    <td className="text-center py-3">
                      {book?.patron?.surname} {book?.patron?.first_name}{" "}
                      {book?.patron?.other_name}
                    </td>
                    <td className="text-center py-3">{book?.title}</td>
                    <td className="text-center py-3">{book?.authors}</td>
                    <td className="text-center py-3">{book?.category}</td>
                    <td className="text-center py-3">{book?.publisher}</td>
                    <td className="text-center py-3">{book?.totalStock}</td>
                    <td className="text-center py-3">{book?.availableStock}</td>

                    <td className="text-center p-[10px]">
                      <span className="flex items-center justify-center gap-4">
                        <button
                          className={`border border-blue-500 text-blue-500 hover:text-white flex justify-center items-center py-[5px] px-3 rounded-full hover:bg-blue-500 transition-all duration-300 cursor-pointer`}
                          title="View"
                          onClick={() => handleViewBook(book)}
                        >
                          <IoMdEye size={14} className="" />
                        </button>
                        <button
                          className={`border  border-yellow-500 text-yellow-500 hover:text-[#6c757d] hidden justify-center items-center py-[5px] px-3 rounded-full hover:bg-yellow-500 transition-all duration-300 cursor-pointer`}
                          title="Edit"
                          // onClick={() => handleEditPopUp(leave)}
                        >
                          <FaEdit size={14} className="" />
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
    </>
  );
};
export default AllBooks;
