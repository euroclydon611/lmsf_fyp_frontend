import { RxCross1 } from "react-icons/rx";
import { mapAuthorsToString } from "../../utils/bookUtils";
import { backend_url } from "../../server/server";

const BookInfo = ({ data, setOpen }: any) => {
  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] mt-[10px] 800px:w-[60%] h-[82vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] flex flex-col items-center">
                <img
                  src={`${backend_url}${data?.images && data?.images[0]}`}
                  alt=""
                  className="h-[500px]"
                />

                <h5 className="text-[16px] text-[red] mt-5">
                  Author(s):{mapAuthorsToString(data)}
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className="text-[20px] mb-2 font-[600]  text-[#333] ">
                  {data?.title}
                </h1>
                <p>{data?.description}</p>

                <p className="mt-6 text-red-500">{data?.pages} Pages</p>

                {data?.availableStock > 0 ? (
                  <div
                    className={`mt-6 w-[150px] bg-green-700 rounded-[4px] py-3 text-center`}
                  >
                    <span className="text-[#fff] ">Available</span>
                  </div>
                ) : (
                  <div
                    className={`mt-6 w-[150px] bg-green-300 rounded-[4px] py-3 text-center`}
                  >
                    <span className="text-[#fff] ">Unavailable</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookInfo;
