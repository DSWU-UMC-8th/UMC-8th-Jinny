import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLpDetail } from "../apis/lp";

import Pencil from "../assets/img/pen.png";
import Trash from "../assets/img/trash.png";

const LPList = () => {
  const { LPid } = useParams();
  console.log(LPid);

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!LPid) return;

        const result = await getLpDetail(LPid);
        setData(result.data);
        console.log(result);
      } catch (error) {
        console.error("LP 상세 조회 실패:", error);
      }
    };

    fetchData();
  }, [LPid]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold mb-2">{data?.title}</p>
        <div className="flex w-full justify-between">
          <p>{data?.author?.name}</p>
          <div className="flex">
            <img src={Pencil} className="w-[20px]" />
            <img src={Trash} className="w-[20px]" />
          </div>
        </div>
        <img src={data.thumbnail} className="w-[300px]" />
        <p>{data.content}</p>
        <button>🖤{data?.likes?.length || 0}</button>
      </div>
    </div>
  );
};

export default LPList;
