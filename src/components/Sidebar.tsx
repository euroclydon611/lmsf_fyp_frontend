import { Layout } from "antd";
import { Menu } from "antd";
const { Sider } = Layout;
import { BsArrowLeftShort } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IoMdHome } from "react-icons/io";
import { FaBook } from "react-icons/fa6";
import { RiGitPullRequestFill } from "react-icons/ri";
import { GrCatalog } from "react-icons/gr";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const [openKeys, setOpenKeys] = useState([]);
  const { user } = useSelector((state: RootState) => state.auth) as any;

  const handleOpenChange = (keys: any) => {
    setOpenKeys(keys.slice(-3)); // Keep only the last opened submenu key
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen]);

  const isStudent = user?.role;

  return (
    <Layout
      className={`fixed top-0 left-0 bottom-0 z-50 bg-[#ffffff] h-screen shadow-xl  transition duration-500`}
    >
      <BsArrowLeftShort
        className={`bg-gray-900 text-white text-lg rounded-full absolute -right-2 z-20 top-8 border border-white cursor-pointer ${
          !sidebarOpen && "rotate-180"
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <Sider
        collapsed={!sidebarOpen}
        collapsible
        trigger={null}
        className="custom-sider"
      >
        <div className="flex items-center mt-4 justify-center">
          <img
            src="../../public/logo1.jpg"
            className="w-[150px] max-800px:w-[100px]"
            alt=""
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          className="sidebar  flex flex-col gap-2"
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
        >
          <Menu.Item key="dashboard" icon={<IoMdHome size={17} />}>
            <Link to={"/dashboard"}>Dashboard</Link>
          </Menu.Item>
{/* 
          {isStudent !== "STUDENT" && (
            <Menu.Item key="all-books" icon={<FaBook size={17} />}>
              <Link to={"/dashboard/all-books"}>Books</Link>
            </Menu.Item>
          )} */}

          {isStudent !== "STUDENT" && (
            <Menu.Item key="requests" icon={<RiGitPullRequestFill size={17} />}>
              <Link to={"/dashboard/requests"}>Requests</Link>
            </Menu.Item>
          )}

          {isStudent !== "STUDENT" && (
            <Menu.Item key="reports" icon={<TbReport size={17} />}>
              <Link to={"/dashboard/reports"}>Reports</Link>
            </Menu.Item>
          )}

          {/* {isStudent === "STUDENT" && (
            <Menu.Item key="catalog" icon={<GrCatalog size={17} />}>
              <Link to={"/dashboard/catalog"}>Catalog</Link>
            </Menu.Item>
          )} */}

          {isStudent === "STUDENT" && (
            <Menu.Item key="history" icon={<TbReport size={17} />}>
              <Link to={"/dashboard/history"}>History</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Sidebar;
