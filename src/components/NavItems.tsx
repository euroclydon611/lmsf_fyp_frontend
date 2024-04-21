import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);

  const navLinks = [
    // {
    //   name: "Home",
    //   url: "/lms-portal",
    // },
    // {
    //   name: "Catalog",
    //   url: "/lms-portal/catalog",
    // },
    // {
    //   name: "Books",
    //   url: "/lms-portal/all-books",
    // },
  ];

  if ((user?.role as string) === "PATRON") {
    navLinks.push(
      {
        name: "Books",
        url: "/lms-portal/all-books",
      },
      {
        name: "Requests",
        url: "/lms-portal/requests",
      },
      {
        name: "Reports",
        url: "/lms-portal/reports",
      }
    );
  }

  if ((user?.role as string) === "STUDENT") {
    navLinks.push(
      {
        name: "Catalog",
        url: "/lms-portal",
      },
      // {
      //   name: "Catalog",
      //   url: "/lms-portal/history",
      // },
      {
        name: "History",
        url: "/lms-portal/history",
      }
    );
  }

  return (
    <>
      <div className="hidden 800px:flex gap-4">
        {navLinks &&
          navLinks.map((link, index) => (
            <Link to={link.url} key={index}>
              <span
                className={`${
                  activeItem === index ? "text-yellow-600" : ""
                } text-[17px] px-6 font-[400]`}
              >
                {link.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          {navLinks &&
            navLinks.map((link, index) => (
              <Link to={link.url} key={index}>
                <span
                  className={`${
                    activeItem === index ? "text-yellow-600" : ""
                  } text-[17px] text-white px-6 py-3 block  font-[400]`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
