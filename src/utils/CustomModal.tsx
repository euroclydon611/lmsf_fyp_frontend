import { FC } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  Component: any;
  itemData?: any;
  refetch?: any;
};

const CustomModal: FC<Props> = ({ setOpen, Component, itemData, refetch }) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Check if the click occurred outside the Box
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center w-full mx-auto justify-center overflow-x-hidden bg-[#00000080] fade-in"
      onClick={handleClose}
    >
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[550px] max-md:w-[300px] bg-white rounded-md shadow p-4 outline-none z-50 ">
        <Component setOpen={setOpen} itemData={itemData} refetch={refetch} />
      </div>
    </div>
  );
};

export default CustomModal;
