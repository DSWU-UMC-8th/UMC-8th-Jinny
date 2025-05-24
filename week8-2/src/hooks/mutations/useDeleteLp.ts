import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { RequestLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLp() {
  return useMutation({
    mutationFn: ({ lpid }: RequestLpDto) => deleteLp({ lpid }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
}

export default useDeleteLp;
