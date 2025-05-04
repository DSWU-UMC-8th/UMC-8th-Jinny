export type CommomResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};
