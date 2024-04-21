import { useState } from "react";
import FeaturedBooks from "../components/book/FeaturedBooks";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState<any>("");
  const { user } = useSelector((state: RootState) => state.auth) as any;

  return (
    <div>
      {/* search box */}
      <div
        className={`${
          user?.role == "PATRON" && "hidden"
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
      <FeaturedBooks searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
