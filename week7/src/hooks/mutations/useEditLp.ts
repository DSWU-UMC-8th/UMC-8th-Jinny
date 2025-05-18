import { useMutation } from "@tanstack/react-query";
import { editLp } from "../../apis/lp";
import { requestEditLpDto, RequestLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useEditLp({ lpid }: RequestLpDto) {
  return useMutation({
    mutationFn: ({ lpid, body }: requestEditLpDto) => editLp({ lpid, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpid],
      });
    },
  });
}

export default useEditLp;
