import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { lp } from "../../types/lp";

interface LpCardProps {
  lp: lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleLpClick = (lpid: number) => {
    if (!accessToken) {
      // 로그인하지 않은 경우 경고 창 띄우기
    } else {
      navigate(`/lp/${lpid}`);
    }
  };
  return (
    <div
      className="relative w-[250px] h-[250px] overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer"
      onClick={() => handleLpClick(lp.id)}
    >
      <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
        <h3 className="text-lg font-bold mb-2">{lp.title}</h3>
        <p className="text-sm">{new Date(lp.createdAt).toLocaleDateString("ko-KR")}</p>
        <p className="text-sm">🖤 {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LpCard;
