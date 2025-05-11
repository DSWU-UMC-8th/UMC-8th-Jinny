import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const { data, isPending, isError } = useGetLpList({
    search,
  });
  console.log(data);

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
          >
            <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-lg font-bold mb-2">{lp.title}</h3>
              <p className="text-sm">{new Date(lp.createdAt).toLocaleDateString("ko-KR")}</p>
              <p className="text-sm">🖤 {lp.likes.length} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
