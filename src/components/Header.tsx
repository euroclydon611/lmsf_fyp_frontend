import { FC, useState } from "react";
import { Dropdown, Space } from "antd";
import NavItems from "./NavItems";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useNotificationListQuery } from "../redux/features/notification/notificationApi";
import { FaSignOutAlt } from "react-icons/fa";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};

const Header: FC<Props> = ({
  activeItem,
  open,
  setOpen,
  searchTerm,
  setSearchTerm,
}: any) => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>(null);
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: notificationData } = useNotificationListQuery({
    id: user?._id,
  });

  console.log("notification", notificationData);

  const pendingNotificationLength = notificationData?.notifications.filter(
    (notification: any) => notification?.status === "Pending"
  ).length;

  console.log(notificationData);
  console.log(pendingNotificationLength);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSideBar(false);
      }
    }
  };

  return (
    <div className="w-full relative bg-red-blue z-40 bg-white">
      <div
        className={`w-full h-[80px] z-[80] ${
          active
            ? "fixed top-0 left-0 border-b-[#ffffff1c] shadow-xl transition-all duration-500 bg-white"
            : "border-b border-[#ffffff1c] shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-full flex items-center justify-between p-3">
            <div>
              <div className="text-[25px]  font-[500]">
                <img
                  src="../../public/logo.png"
                  className="w-[150px] max-800px:w-[100px]"
                  alt=""
                />
              </div>
            </div>
            {/* search box */}
            <div
              className={`${
                user?.role == ("PATRON" as string) && "hidden"
              } w-[40%] 800px:w-[30%] relative`}
            >
              <input
                type="text"
                placeholder="Search book..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-[35px] w-full pl-2 border-gray-800 border rounded-lg text-sm"
              />
              <AiOutlineSearch
                size={20}
                className="absolute right-2 top-2 cursor-pointer"
              />
            </div>

            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              {/* only for mobile */}
              <Link
                to={"/lms-portal/notifications"}
                className="text-white relative mr-2"
              >
                <MdOutlineNotificationsNone size={30} className="text-black" />
                <span
                  className={`absolute text-[12px] ${
                    pendingNotificationLength === 0 ? "bg-gray-600 " : ""
                  } bg-red-600 top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center`}
                >
                  {pendingNotificationLength}
                </span>
              </Link>
              <Dropdown
                overlay={
                  <ul className="w-48 bg-white border border-gray-200 rounded-md shadow-lg z-[9999]">
                    <li
                      className="p-4 flex items-center hover:bg-gray-100 cursor-pointer"
                      // onClick={handleLogout}
                    >
                      <Space>
                        <FaSignOutAlt className="mr-2" />
                        <span>Logout</span>
                      </Space>
                    </li>
                  </ul>
                }
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col items-center gap-1">
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer text-black max-800px:hidden"
                      onClick={() => setOpen(true)}
                    />
                    <h1 className=" max-800px:hidden font-semibold italic text-xs">
                      Hello, {user?.first_name}
                    </h1>
                  </div>
                </a>
              </Dropdown>

              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpenSideBar(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* mobile sidebar */}
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 z-[99999] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[50%] fixed z-[999999] h-screen top-0 right-0  bg-gray-700">
              <NavItems activeItem={activeItem} isMobile={true} />
              <button className="text-white px-3 py-2 ml-3">Logout</button>

              <p className="absolute bottom-2 right-6">
                Copyright &copy; 2024 UPSA
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
