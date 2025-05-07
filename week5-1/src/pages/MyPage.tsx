import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import Profile from "../assets/img/profile.jpg";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center mt-[100px] gap-3">
      <img src={(data?.data?.avatar as string) || Profile} alt="이미지" className="w-[150px]" />

      <h1 className="text-2xl font-bold">{data?.data?.name}님 환영합니다🥳</h1>
      <h1 className="text-lg">{data?.data?.email}</h1>

      <button className="cursor-pointer bg-yellow-100 rounded-sm p-3 hover:scale-90 w-[300px]" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
