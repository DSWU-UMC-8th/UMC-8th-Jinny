import { Link } from "react-router-dom";
import Search from "../assets/img/search.png";
import User from "../assets/img/sidebar-user.png";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Unscribe from "./unscribe";

const Sidebar = () => {
  const { accessToken } = useAuth();

  const [isClicked, setIsClicked] = useState(false);

  const handleUnscribeClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <>
      {isClicked && <Unscribe onClose={handleUnscribeClick} />}
      <div className="mt-20 flex flex-col gap-6 p-6 h-full shadow-md w-[200px] fixed">
        <div className="flex gap-3 items-center">
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

        <button
          onClick={handleUnscribeClick}
          className="relative top-[60%] cursor-pointer text-[#ED0086] flex flex-start hover:text-[#bf016d] transition-color duration-300"
        >
          탈퇴하기
        </button>
      </div>
    </>
  );
};

export default Sidebar;
