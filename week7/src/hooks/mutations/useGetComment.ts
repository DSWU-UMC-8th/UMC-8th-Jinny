import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDto } from "../../types/lp";
import { getComment } from "../../apis/lp";

function useGetComment({ lpid }: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.comments, lpid],
    queryFn: () => getComment({ lpid }),
  });
}

export default useGetComment;
