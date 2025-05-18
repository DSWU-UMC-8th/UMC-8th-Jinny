import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  // data -> API 성공 응답 데이터
  // variables -> mutate에 전달한 값
  // context -> onMutate에서 반환한 값
  return useMutation({
    mutationFn: postLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
      });
    },

    // // error -> 요청 실패시 발생한 에러
    // // variables -> onMutate에서 전달한 값
    // // context -> onMutate에서 반환한 값
    // onError: (error, variables, context) => {},

    // // 요청 직전에 실행
    // // 실행되기 직전에 실행됨
    // onMutate: () => {
    //   return "hello";
    // },

    // // 요청이 끝난 후 항상 실행됨 (onSuccess, onError 후에 실행)
    // // 로딩 상태를 초기화할 때 유용함
    // onSettled: () => {},
  });
}

export default usePostLike;
