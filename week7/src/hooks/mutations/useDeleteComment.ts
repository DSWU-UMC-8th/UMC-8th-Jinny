import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/lp";
import { requestDeleteCommentDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteComment() {
  return useMutation({
    mutationFn: ({ lpid, commentId }: requestDeleteCommentDto) => deleteComment({ lpid, commentId }),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, data.lpid],
      });
    },
  });
}

export default useDeleteComment;
