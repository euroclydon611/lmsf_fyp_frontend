import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRequestBookMutation } from "../redux/features/book/bookApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const ConfirmationPopUp = ({ itemData, setOpen }: any) => {
  const [requestBook, { data, isLoading, isSuccess, error }] =
    useRequestBookMutation();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleConfirmRequest = async (e: any) => {
    e.preventDefault();
    await requestBook({ userId: user?._id, bookId: itemData?._id });
  };

  const handleCancelRequest = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message;
      toast.success(message, { duration: 5000 });
      setOpen(false);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        const message = errorData?.data?.message;
        toast.error(message, { duration: 5000 });
        setOpen(false);
      }
    }
  }, [isSuccess, error]);

  return (
    <div>
      <div className="">
        <p className="text-center">
          Are you sure you want to request this book?
        </p>
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
  );
};

export default ConfirmationPopUp;
