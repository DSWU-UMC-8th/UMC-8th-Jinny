import { useMutation } from "@tanstack/react-query";
import { editComment } from "../../apis/lp";
import { requestEditCommentDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useEditComment() {
  return useMutation({
    mutationFn: ({ lpid, commentId, content }: requestEditCommentDto) => editComment({ lpid, commentId, content }),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, data.lpid],
      });
    },
  });
}

export default useEditComment;
