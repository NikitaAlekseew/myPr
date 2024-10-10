// @ts-ignore
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  credentials: "include", // Включает куки в запросы для поддержания сессий
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Функция для получения текущего состояния Redux

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error &&
    "status" in result.error &&
    result.error.status === 401
  ) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const state = api.getState() as RootState;
      const user = state.auth.user;

      if (user) {
        api.dispatch(
          setCredentials({
            ...refreshResult.data,
            user,
            accessToken: "",
          })
        );
      } else {
        api.dispatch(
          setCredentials({
            ...refreshResult.data,
            user: { email: "", isActivated: false },
            accessToken: "",
          })
        );
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const { useRefreshMutation } = apiSlice;
