import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useApproveRequestMutation } from "../redux/features/book/bookApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ApproveRequestPopup = ({ itemData, setOpen, refetch }: any) => {
  const [approveBook, { data, isLoading, isSuccess, error }] =
    useApproveRequestMutation();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleConfirmRequest = async (e: any) => {
    e.preventDefault();
    return await approveBook({ patronId: user?._id, requestId: itemData?._id });
  };

  const handleCancelRequest = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Request Approved";
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
      <div className="">
        <p className="text-center">
          Are you sure you want to approve this request?
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

export default ApproveRequestPopup;
