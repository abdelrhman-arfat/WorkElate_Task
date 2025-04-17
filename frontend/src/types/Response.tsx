type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: boolean;
  code: number;
  totalPages: number;
  currentPage: number;
  totalBooks: number;
};

export type { TResponse };
