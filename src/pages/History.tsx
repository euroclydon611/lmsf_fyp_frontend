import { useStudentHistoryQuery } from "../redux/features/requests/requests";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { styles } from "../styles";
import { Pagination } from "antd";
import { useState } from "react";
import { mapAuthorsToString } from "../utils/bookUtils";
import { formatDate } from "../utils/utilityFunctions";
import Loader from "../components/Loader";

const History = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { data, isLoading } = useStudentHistoryQuery({ id: user?._id });

  const handleChangePage = (page: any) => {
    setPage(page);
  };

  console.log("history", data);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-3">
      <h1 className="text-[18px] mb-3 font-bold">All your request history</h1>
      <table className="table-auto w-full bg-white">
        <thead className="sticky -top-1 text-[14.4px] z-[9] bg-slate-100">
          <tr>
            <th className={`min-w-[50px]`}>No</th>
            <th className={`${styles.wide_tb_th} border-y`}>Title</th>
            <th className={`${styles.wide_tb_th} border-y`}>Author</th>
            <th className={`${styles.wide_tb_th} border-y`}>Requested Date</th>
            <th className={`${styles.wide_tb_th} border-y`}>Status</th>
            <th className={`${styles.wide_tb_th} border-y`}>Fine</th>
          </tr>
        </thead>
        <tbody>
          {data?.requests ? (
            data?.requests?.map((book: any, i: any) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="text-center p-[10px]">
                  {(page - 1) * limit + i + 1}
                </td>
                <td className="text-center py-3">{book?.bookId?.title}</td>

                <td className="text-center py-3">
                  {(book?.bookId && mapAuthorsToString(book?.bookId)) || ""}
                </td>
                <td className="text-center py-3">
                  {formatDate(book?.requestDate)}
                </td>
                <td className="text-center py-3">
                  {book?.status === "Pending" ? (
                    <span className="text-yellow-500 font-bold">Pending</span>
                  ) : book?.status === "Approved" ? (
                    <span className="text-green-500 font-bold">Approved</span>
                  ) : (
                    <span>{book?.status}</span>
                  )}
                </td>
                <td className="text-center py-3">{book?.fine || "-"}</td>
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

export default History;
