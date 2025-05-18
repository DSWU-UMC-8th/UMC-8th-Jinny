import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";

import Pencil from "../assets/img/pen.png";
import Trash from "../assets/img/trash.png";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useGetComment from "../hooks/mutations/useGetComment";
import usePostComment from "../hooks/mutations/usePostComment";
import { useState } from "react";

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

  const { data: comment } = useGetComment({ lpid: Number(lpid) });
  console.log(comment);

  const [commentInput, setCommentInput] = useState("");
  const { mutate: postComment } = usePostComment();

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

  const handleCommentPost = () => {
    if (!commentInput.trim()) return;
    postComment(
      { lpid: Number(lpid), content: commentInput },
      {
        onSuccess: () => {
          setCommentInput("");
        },
      }
    );
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

        <div className="flex justify-between w-[50%] mt-4 gap-2">
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력해주세요"
            className="border border-[#ED0086] rounded-sm p-2 w-full"
          />
          <button
            className="w-[100px] border bg-[#ED0086] cursor-pointer rounded-sm text-white"
            onClick={handleCommentPost}
          >
            작성
          </button>
        </div>

        <div className="flex flex-col w-[50%] mt-4 gap-2">
          {isPending ? (
            <p>댓글 불러오는 중...</p>
          ) : comment?.data?.data.length === 0 ? (
            <p>아직 댓글이 없습니다.</p>
          ) : (
            comment?.data.data.map((item: { content: string; id: number }) => (
              <div key={item.id} className="p-2 border-b">
                {item.content}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LpDetailPage;
