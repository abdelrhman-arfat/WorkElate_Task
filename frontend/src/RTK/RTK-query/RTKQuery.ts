import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACKEND_URL } from "../../constants/env";
import { TBook, TBooks } from "../../types/TBooks";
import { TResponse } from "../../types/Response";

export const RTKQuery = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getBooks: builder.query<
      TBooks,
      { page: number; limit: number; search?: string; startsWith?: string }
    >({
      query: ({ limit = 12, page = 1, search, startsWith }) =>
        `/books?limit=${limit}&page=${page}&search=${search}&startsWith=${startsWith}`,
    }),
    getBookById: builder.query<TResponse<TBook>, { id: string }>({
      query: ({ id }) => `/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = RTKQuery;
