import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useAuth } from "../context/AuthContext";
import { PAGINATION_ORDER } from "../enums/common";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isError,
    fetchNextPage,
    isPending,
  } = useGetInfiniteLpList(3, search, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleLpClick = (lpId: string) => {
    if (!accessToken) {
      // 로그인하지 않은 경우 경고 창 띄우기
    } else {
      navigate(`/lp/${lpId}`);
    }
  };

  if (isPending || isFetching) {
    return (
      <div className="mt-20 flex flex-wrap gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative w-[250px] h-[250px] overflow-hidden rounded-lg shadow-md bg-gray-300 animate-pulse"
          >
            <div className="w-full h-full bg-gray-400"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <div className="h-6 bg-gray-400 w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-400 w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 에러 처리
  if (isError) {
    return <div className="mt-20">Error</div>;
  }

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="w-full flex justify-end">
        <button
          className={`p-1 border border-[#ED0086] rounded-sm cursor-pointer ${
            order === PAGINATION_ORDER.asc ? "bg-gray-100 text-black" : "bg-[#ED0086] text-white"
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
        >
          오래된순
        </button>
        <button
          className={`p-1 border border-[#ED0086] rounded-sm cursor-pointer ${
            order === PAGINATION_ORDER.desc ? "bg-gray-100 text-black" : " bg-[#ED0086] text-white"
          }`}
          onClick={() => setOrder(PAGINATION_ORDER.desc)} // 최신순 클릭 시 정렬 변경
        >
          최신순
        </button>
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <div
              key={lp.id}
              className="relative w-[250px] h-[250px] overflow-hidden rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
              onClick={() => handleLpClick(lp.id)}
            >
              <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
                <h3 className="text-lg font-bold mb-2">{lp.title}</h3>
                <p className="text-sm">{new Date(lp.createdAt).toLocaleDateString("ko-KR")}</p>
                <p className="text-sm">🖤 {lp.likes.length}</p>
              </div>
            </div>
          ))}
      </div>

      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
