import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  // data -> API 성공 응답 데이터
  // variables -> mutate에 전달한 값
  // context -> onMutate에서 반환한 값
  return useMutation({
    mutationFn: postLike,

    // onMutate -> API 요청 이전에 호출
    // UI에 바로 변경을 보여주기 위해 캐시 업데이트
    onMutate: async (lp) => {
      // 1. 해당 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpid],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야 함
      const prevLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lp.lpid]);

      // 3. 게시글 데이터를 복사해서 newLPost 라는 새로운 객체 생성
      // 복사하는 이유: 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해
      const newLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lp.lpid]);

      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야 함
      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userid = Number(me?.data.id);

      const likedIdx = prevLpPost?.data.likes.findIndex((like) => like.userId === userid) ?? -1;

      if (likedIdx >= 0) {
        prevLpPost?.data.likes.splice(likedIdx, 1);
      } else {
        const newLike = { userId: userid, lpid: lp.lpid } as Likes;
        prevLpPost?.data.likes.push(newLike);
      }

      // 업데이터된 게시글 데이터를 캐시에 저장
      // 이렇게 하면, UI가 바로 업데이트되고, 사용자가 변화 확인 가능
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpid], newLpPost);

      return { prevLpPost, newLpPost };
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData([QUERY_KEY.lps, newLp.lpid], context?.prevLpPost?.data.id);
    },

    // onSettled는 API 요청이 끝난 후 (성공하든 실패하든 실행됨)
    onSettled: async (data, error, variable, context) => {
      console.log(data, error, context);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variable.lpid],
      });
    },
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY.lps, data.data.lpId],
    //   });
    // },

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
