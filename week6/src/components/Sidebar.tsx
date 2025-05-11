import { Link } from "react-router-dom";
import Search from "../assets/img/search.png";
import User from "../assets/img/sidebar-user.png";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { accessToken } = useAuth();
  return (
    <div className="mt-20 flex flex-col gap-4 p-6 h-full shadow-md w-[200px]">
      <div className="flex gap-3 itmes-center">
        <div className="w-[20px] h-[20px]">
          <img src={Search} alt="찾기" />
        </div>
        <Link to={"/search"} className="text-gray-700 dart:text-gray-300 hover:text-[#ED0086]">
          찾기
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        {accessToken && (
          <>
            <div className="w-[20px] h-[20px]">
              <img src={User} alt="마이페이지" />
            </div>
            <Link to={"/mypage"} className="text-gray-700 dart:text-gray-300 hover:text-[#ED0086]">
              마이페이지
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
