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

      <div className="flex flex-wrap">
        {data?.map((lp) => (
          <div className="w-[250px] h-[250px]" key={lp.id}>
            <img src={lp.thumbnail} alt={lp.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
