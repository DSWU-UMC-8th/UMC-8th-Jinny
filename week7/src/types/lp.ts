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
