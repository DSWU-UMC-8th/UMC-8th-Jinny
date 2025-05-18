import { CommomResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpid: number;
};

export type lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<lp[]>;

export type RequestLpDto = {
  lpid: number;
};

export type ResponseLpDto = CommomResponse<lp>;

export type ResponseLikeLpDto = CommomResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestPostLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type ResponsePostLpDto = CommomResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}>;

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type CommentResponseData = {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
};

export type ResponseCommentDto = {
  status: boolean;
  message: string;
  statusCode: number;
  data: CommentResponseData;
};

export type RequestCommentDto = {
  lpid: number;
  content: string;
};

export type requestEditCommentDto = {
  lpid: number;
  commentId: number;
  content: string;
};

export type requestDeleteCommentDto = {
  lpid: number;
  commentId: number;
};

export type requestEditUserDto = {
  name: string;
  bio: string;
  avatar?: string;
};
