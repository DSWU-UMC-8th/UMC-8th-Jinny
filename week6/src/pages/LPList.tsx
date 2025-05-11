import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { getComment, getLpDetail } from "../apis/lp";

import Pencil from "../assets/img/pen.png";
import Trash from "../assets/img/trash.png";

const LPList = () => {
  const { LPid } = useParams();
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!LPid) return;

        const result = await getLpDetail(LPid);
        setData(result.data);
        fetchMoreComments();
      } catch (error) {
        console.error("LP 상세 조회 실패:", error);
      }
    };

    fetchData();
  }, [LPid]);

  const fetchMoreComments = useCallback(async () => {
    if (!LPid || loading || !hasNext) return;

    setLoading(true);
    try {
      const res = await getComment(LPid, cursor);
      const newComments = res.data.data;
      setComments((prev) => [...prev, ...newComments]);
      setCursor(res.data.nextCursor);
      setHasNext(res.data.hasNext);
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  }, [LPid, cursor, loading, hasNext]);

  useEffect(() => {
    if (inView) {
      fetchMoreComments();
    }
  }, [inView, fetchMoreComments]);

  return (
    <>
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

      <div className="flex flex-col items-center">
        <div className="flex justify-between w-[50%] mt-8">
          <p>댓글</p>
          <div>
            <button>오래된순</button>
            <button>최신순</button>
          </div>
        </div>

        <div className="flex justify-between w-[50%] mt-4">
          <input placeholder="댓글을 입력해주세요" className="w-full" />
          <button className="w-[100px]">작성</button>
        </div>

        <div className="flex flex-col w-[50%] mt-4 gap-2">
          {comments.map((item, index) => (
            <div key={index} className="p-2 border-b">
              {item.content}
            </div>
          ))}
        </div>

        {hasNext && (
          <div ref={ref} className="h-10 flex items-center justify-center">
            {loading ? "불러오는 중..." : "더 불러오기"}
          </div>
        )}
      </div>
    </>
  );
};

export default LPList;
