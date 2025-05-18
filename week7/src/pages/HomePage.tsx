import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCardInput from "../components/LpCard/LpCardInput";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [showInput, setShowInput] = useState(false);

  // const { data, isPending, isError } = useGetLpList({ search, limit: 50 });
  // console.log(data);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isError,
    fetchNextPage,
    isPending,
  } = useGetInfiniteLpList(3, search, order);

  // ref: 특정한 HTML 요소를 감시할 수 있음
  // inView: 해당 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // 에러 처리
  if (isError) {
    return <div className="mt-20">Error</div>;
  }

  const handlePlusClick = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {showInput && <LpCardInput onClose={handlePlusClick} />}
      <div className="w-full flex justify-end">
        <button
          className="border border-[#ED0086] rounded-[50%] cursor-pointer p-4 w-4 text-center w-10 h-10 align-center flex justify-center items-center"
          onClick={handlePlusClick}
        >
          +
        </button>
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
            <LpCard key={lp.id} lp={lp} />
          ))}

        {/* 스켈레톤 UI */}
        {(isPending || isFetching) && <LpCardSkeletonList count={20} />}
      </div>

      {/* 이게 보이면 inView true, 다음 페이지 호출 */}
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
