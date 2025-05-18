import { useMutation } from "@tanstack/react-query";
import { unscribe } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteUser() {
  return useMutation({
    mutationFn: unscribe,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      alert("회원 탈퇴가 완료되었습니다.");
      window.location.reload();
    },
  });
}

export default useDeleteUser;
