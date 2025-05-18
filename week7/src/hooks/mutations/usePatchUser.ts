import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../apis/lp";
import { requestEditUserDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchUser() {
  return useMutation({
    mutationFn: ({ name, bio, avatar }: requestEditUserDto) => editUser({ name, bio, avatar }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default usePatchUser;
