import { Link, Outlet, useNavigate } from "react-router-dom";
import { Layout, theme, Dropdown, Space } from "antd";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useNotificationListQuery } from "../redux/features/notification/notificationApi";
import Loader from "../components/Loader";
import { useLogoutQuery } from "../redux/features/auth/authApi";
import { HiOutlineUserCircle } from "react-icons/hi";
import toast from "react-hot-toast";
import axios from "axios";

const { Header } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth) as any;

  const handleLogout = async () => {
    axios;
  };

  const { data: notificationData, isLoading: notificationLoading } =
    useNotificationListQuery({
      id: user?._id,
    });

  const [logout, setLogout] = useState(false);
  const { data, isSuccess } = useLogoutQuery(undefined, {
    skip: !logout,
  });

  const logOutHandler = async () => {
    setLogout(true);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message, { duration: 5000 });
      navigate("/");
    }
  }, [isSuccess]);

  console.log("notification", notificationData);

  const pendingNotificationLength = notificationData?.notifications.filter(
    (notification: any) => notification?.status === "Pending"
  ).length;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (notificationLoading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full">
      <div className="bg-blue-500">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div
        className={`w-[100%] h-[100vh] ${
          sidebarOpen ? "ml-[205px]" : "ml-[85px]"
        } overflow-x-hidden`}
      >
        <Layout className="bg-gray-50 content flex flex-col min-h-screen">
          <Header
            style={{ padding: 0, background: colorBgContainer }}
            className="mb-5"
          >
            <nav className="py-3 border bg-white w-full fixed top-0 left-0 right-0">
              <div className="flex justify-between">
                <div></div>
                <div className="flex items-center gap-4 mr-5">
                  <Link
                    to={"/dashboard/notifications"}
                    className="text-white relative mr-2"
                  >
                    <MdOutlineNotificationsNone
                      size={30}
                      className="text-black"
                    />
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
                          onClick={logOutHandler}
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
                          //   onClick={() => setOpen(true)}
                        />
                        <h1 className=" max-800px:hidden font-semibold italic text-xs">
                          Hello, {user?.first_name}
                        </h1>
                      </div>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </nav>
          </Header>
          <div className="flex-1">
            <Outlet />
          </div>
          <footer className="text-[11px]">
            © 2024, UPSA ALL RIGHTS RESERVED
          </footer>
        </Layout>
      </div>
    </div>
  );
};

export default MainLayout;
