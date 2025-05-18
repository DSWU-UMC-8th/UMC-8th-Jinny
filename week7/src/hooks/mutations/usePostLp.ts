import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponsePostLpDto } from "../../types/lp";

interface CreateLpDto {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

function usePostLp(options?: UseMutationOptions<ResponsePostLpDto, unknown, CreateLpDto>) {
  return useMutation({
    mutationFn: postLp,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.id],
      });
      options?.onSuccess?.(data, variables, context); // 전달받은 onSuccess 실행
    },
    ...options,
  });
}

export default usePostLp;
