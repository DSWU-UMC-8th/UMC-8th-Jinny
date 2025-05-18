import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";

import Pencil from "../assets/img/pen.png";
import Trash from "../assets/img/trash.png";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { lpid } = useParams();

  const { data: lp, isPending, isError } = useGetLpDetail({ lpid: Number(lpid) });

  console.log(lp?.data.likes);

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업을 처리
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //   .map((like) => {
  //     like.userid;
  //   })
  //   .includes(me?.data.id as number);

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  if (isPending && isError) {
    return;
  }

  const handleLikeLp = () => {
    likeMutate({ lpid: Number(lpid) });
  };

  const handleDislikeLp = () => {
    disLikeMutate({ lpid: Number(lpid) });
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold mb-2">{lp?.data.title}</p>
          <div className="flex w-full justify-between">
            {/* <p>{lp?.data.author?.name}</p> */}
            <div className="flex">
              <img src={Pencil} className="w-[20px]" />
              <img src={Trash} className="w-[20px]" />
            </div>
          </div>
          <img src={lp?.data.thumbnail} className="w-[300px]" />
          <p>{lp?.data.content}</p>
          <button onClick={isLiked ? handleDislikeLp : handleLikeLp} className="cursor-pointer">
            {isLiked ? "❤️" : "🖤"} {lp?.data.likes.length || 0}
          </button>
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
          {/* {comments.map((item, index) => (
            <div key={index} className="p-2 border-b">
              {item.content}
            </div>
          ))} */}
        </div>

        {/* {hasNext && (
          <div ref={ref} className="h-10 flex items-center justify-center">
            {loading ? "불러오는 중..." : "더 불러오기"}
          </div>
        )} */}
      </div>
    </>
  );
};

export default LpDetailPage;
