import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import useGetLpList from "../hooks/queries/useGetLpList";
import { useAuth } from "../context/AuthContext"; // 로그인 상태 확인

const HomePage = () => {
  const [search, setSearch] = useState("");
  const { data, isPending, isError } = useGetLpList({
    search,
  });

  const { accessToken } = useAuth(); // 로그인 상태 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  const [showWarning, setShowWarning] = useState(false); // 경고 창 상태 관리

  const handleLpClick = (lpId: string) => {
    if (!accessToken) {
      // 로그인하지 않은 경우 경고 창 띄우기
      setShowWarning(true);
    } else {
      // 로그인 상태라면 LP 상세 페이지로 이동
      navigate(`/lp/${lpId}`);
    }
  };

  const handleLoginRedirect = () => {
    // 로그인 화면으로 이동
    navigate("/login");
  };

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error</div>;
  }

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="w-full flex justify-end">
        <button className="p-1 border border-[#ED0086] rounded-sm cursor-pointer">오래된순</button>
        <button className="p-1 border border-[#ED0086] rounded-sm cursor-pointer">최신순</button>
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        {data?.map((lp) => (
          <div
            key={lp.id}
            className="relative w-[250px] h-[250px] overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
            onClick={() => handleLpClick(lp.id)} // LP 카드 클릭 시 처리
          >
            <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-lg font-bold mb-2">{lp.title}</h3>
              <p className="text-sm">{new Date(lp.createdAt).toLocaleDateString("ko-KR")}</p>
              <p className="text-sm">🖤 {lp.likes.length}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 경고 창 */}
      {showWarning && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p>로그인 후에 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?</p>
            <div className="flex justify-center mt-4 gap-4">
              <button onClick={() => setShowWarning(false)} className="bg-gray-300 text-black px-4 py-2 rounded-md">
                취소
              </button>
              <button onClick={handleLoginRedirect} className="bg-[#ED0086] text-white px-4 py-2 rounded-md">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
