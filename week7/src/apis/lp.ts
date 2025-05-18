import { PaginationDto } from "../types/common";
import {
  RequestCommentDto,
  requestDeleteCommentDto,
  requestEditCommentDto,
  requestEditLpDto,
  requestEditUserDto,
  RequestLpDto,
  RequestPostLpDto,
  ResponseCommentDto,
  ResponseLikeLpDto,
  ResponseLpDto,
  ResponseLpListDto,
  ResponsePostLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (PaginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });

  return data;
};

export const getLpDetail = async ({ lpid }: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const getComment = async ({ lpid }: RequestLpDto): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, { params: { lpid } });
  return data;
};

export const postLike = async ({ lpid }: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
};

export const deleteLike = async ({ lpid }: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
};

export const postLp = async (lpData: RequestPostLpDto): Promise<ResponsePostLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", lpData);
  return data;
};

export const postComment = async ({ lpid, content }: RequestCommentDto) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/comments`, {
    content,
  });

  return data;
};

export const editComment = async ({ lpid, commentId, content }: requestEditCommentDto) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpid}/comments/${commentId}`, {
    content,
  });

  return data;
};

export const deleteComment = async ({ lpid, commentId }: requestDeleteCommentDto) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/comments/${commentId}`);
  return data;
};

export const editUser = async ({ name, bio, avatar }: requestEditUserDto) => {
  const { data } = await axiosInstance.patch("/v1/users", {
    name,
    bio,
    avatar,
  });

  return data;
};

export const editLp = async ({ lpid, body }: requestEditLpDto) => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, body);

  return data;
};

export const deleteLp = async ({ lpid }: RequestLpDto) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}`);

  return data;
};
