import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    if (!accessToken) return;

    const getData = async () => {
      const response = await getMyInfo();

      setData(response);
    };

    getData();
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-[#ED0086] dark:text-white">
          SpiningSpining
        </Link>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link to={"/login"} className="text-gray-700 dart:text-gray-300 hover:text-[#ED0086]">
                로그인
              </Link>
              <Link to={"/signup"} className="text-gray-700 dart:text-gray-300 hover:text-[#ED0086]">
                회원가입
              </Link>
            </>
          )}

          {accessToken && (
            <div className="flex gap-5">
              <p>{data?.data.name}님 반갑습니다🥳</p>

              <button className="cursor-pointer text-[#ED0086] hover:text-[#9b0359]" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
