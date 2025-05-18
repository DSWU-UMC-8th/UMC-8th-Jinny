import { useMutation } from "@tanstack/react-query";
import { editUser } from "../../apis/lp";
import { requestEditUserDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

function usePatchUser() {
  return useMutation({
    mutationFn: ({ name, bio, avatar }: requestEditUserDto) => editUser({ name, bio, avatar }),

    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      const prevName = queryClient.getQueriesData<ResponseMyInfoDto>({ queryKey: [QUERY_KEY.myInfo] });

      queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], (prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          data: {
            ...prev.data,
            name: newData.name ?? prev.data.name,
            bio: newData.bio ?? prev.data.bio,
            avatar: newData.avatar ?? prev.data.avatar,
          },
        };
      });

      return { prevName };
    },

    onError: (err, newData, context) => {
      console.log(err, newData);

      if (context?.prevName) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.prevName);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },

    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY.myInfo],
    //   });
    // },
  });
}

export default usePatchUser;
