import { useState } from "react";
import Ratings from "./Ratings";
import { backend_url } from "../../server/server";
import BookInfo from "./BookInfo";
import { BiSolidBookAdd } from "react-icons/bi";
import CustomModal from "../../utils/CustomModal";
import ConfirmationPopUp from "../ConfirmationPopUp";

const BookCard = ({ data }: any) => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);

  return (
    <>
      {request && (
        <CustomModal
          open={request}
          setOpen={setRequest}
          Component={ConfirmationPopUp}
          itemData={data}
        />
      )}
      <div className="w-full min-h-[250px] bg-white rounded-lg shadow-md p-2 relative cursor-pointer product-card">
        <div>
          <img
            src={`${backend_url}${data?.images && data?.images[0]}`}
            alt="book-images"
            className="w-full h-[170px] object-contain"
          />
        </div>

        <p className="text-[13px] text-blue-400 hover:text-blue-500 font-semibold transition-all duration-300">
          {data?.authors[0]}
        </p>
        <div>
          <h4 className="pb-3 text-[14px] font-[400] hover:text-blue-400 transition duration-300">
            {data?.title?.length > 60
              ? data?.title.slice(0, 65) + "..."
              : data?.title}
          </h4>

          {/* <div className="flex">
            <Ratings rating={data?.ratings} />
          </div> */}
        </div>

        {/* side options */}
        <div className="flex justify-between">
          <p className="text-xs" onClick={() => setOpen(!open)}>
            View Details
          </p>
          {data?.availableStock > 0 ? (
            <button
              className="border p-2 text-xs bg-gray-700 hover:bg-gray-600 shadow-lg transition-all duration-300"
              onClick={() => setRequest(true)}
            >
              <BiSolidBookAdd
                size={20}
                className="text-yellow-600 hover:text-yellow-500 transition-all duration-300"
              />
            </button>
          ) : (
            <button
              className="border p-2 text-xs bg-gray-300"
              //   onClick={() => setRequest(true)}
              disabled
              title="Book out of stock"
            >
              <BiSolidBookAdd size={20} className="text-yellow-200" />
            </button>
          )}
        </div>

        {open ? <BookInfo open={open} setOpen={setOpen} data={data} /> : null}
      </div>
    </>
  );
};

export default BookCard;
