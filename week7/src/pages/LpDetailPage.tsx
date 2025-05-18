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
import { Author } from "../types/lp";
import useEditComment from "../hooks/mutations/useEditCommtent";
import useDeleteComment from "../hooks/mutations/useDeleteComment";

const LpDetailPage = () => {
  const { lpid } = useParams();

  // lp 상세
  const { data: lp, isPending, isError } = useGetLpDetail({ lpid: Number(lpid) });

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업을 처리
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // 댓글 목록 조회
  const { data: comment } = useGetComment({ lpid: Number(lpid) });
  console.log(comment);

  // 댓글 작성
  const [commentInput, setCommentInput] = useState("");
  const { mutate: postComment } = usePostComment();

  // 댓글 수정
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");
  const { mutate: editComment } = useEditComment();

  // 댓글 삭제
  const { mutate: deleteCommentMutate } = useDeleteComment();

  // const isLiked = lp?.data.likes
  //   .map((like) => {
  //     like.userid;
  //   })
  //   .includes(me?.data.id as number);

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  if (isPending && isError) {
    return;
  }

  // 좋아요 누를 때
  const handleLikeLp = () => {
    likeMutate({ lpid: Number(lpid) });
  };

  // 좋아요 취소 누를 때
  const handleDislikeLp = () => {
    disLikeMutate({ lpid: Number(lpid) });
  };

  // 댓글 작성
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

  // 댓글 수정
  const handleEditInput = (id: number, content: string) => {
    setEditCommentId(id);
    setEditInput(content);
  };

  // 댓글 수정 완료
  const handleEditSubmit = () => {
    if (!editCommentId || !editInput.trim()) return;

    editComment(
      {
        lpid: Number(lpid),
        commentId: editCommentId,
        content: editInput,
      },
      {
        onSuccess: () => {
          setEditCommentId(null);
          setEditInput("");
        },
      }
    );
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutate({
      lpid: Number(lpid),
      commentId: commentId,
    });
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
            className="w-[100px] border bg-[#ED0086] cursor-pointer rounded-sm text-white hover:bg-[#bf016d] hover:text-white transition-colors ease-in-out duration-300"
            onClick={handleCommentPost}
          >
            작성
          </button>
        </div>

        <div className="flex flex-col w-[50%] mt-4 gap-2">
          {isPending ? (
            <p>댓글 불러오는 중...</p>
          ) : comment?.data?.data.length === 0 ? (
            <p className="text-gray-500">아직 댓글이 없습니다.</p>
          ) : (
            comment?.data.data.map((item: { author: Author; content: string; id: number }) => (
              <div key={item.id} className="p-2 border-b flex">
                <div className="flex-1">
                  <div>{item.author.name}</div>
                  {editCommentId === item.id ? (
                    <div className="flex gap-2">
                      <input
                        className="border p-1 flex-1 border border-[#ED0086] rounded-sm p-2 w-full"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                      />
                      <button
                        onClick={handleEditSubmit}
                        className="border px-2 h-[40px] bg-[#ED0086] text-white rounded-sm cursor-pointer hover:bg-[#bf016d] hover:text-white transition-colors ease-in-out duration-300"
                      >
                        완료
                      </button>
                    </div>
                  ) : (
                    <div>{item.content}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  {editCommentId !== item.id && (
                    <>
                      <button
                        onClick={() => handleEditInput(item.id, item.content)}
                        className="border border-[#ED0086] h-[40px] p-2 rounded-sm text-[#ED0086] cursor-pointer hover:bg-[#ED0086] hover:text-white transition-colors ease-in-out duration-300"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteComment(item.id)}
                        className="border border-[#ED0086] h-[40px] p-2 rounded-sm text-[#ED0086] cursor-pointer hover:bg-[#ED0086] hover:text-white transition-colors ease-in-out duration-300"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LpDetailPage;
