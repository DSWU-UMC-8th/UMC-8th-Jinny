import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postComment } from "../../apis/lp";

function usePostComment() {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (_, variables) => {
      // 댓글 작성 성공 시 해당 게시글의 댓글 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpid],
      });
    },
  });
}

export default usePostComment;
