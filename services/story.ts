import { LoginRequest, LoginResponse } from "@/model/loginModel";
import { RegisterRequest, RegisterResponse } from "@/model/registerModel";
import { GetStoriesParams, StoriesResponse } from "@/model/StoriesModel";
import axiosBaseQuery from "@/utils/AxiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://story-api.dicoding.dev/v1",
  }),
  endpoints(build) {
    return {
      userRegister: build.mutation<RegisterResponse, RegisterRequest>({
        query: (body) => ({
          url: "/register",
          method: "post",
          data: body,
        }),
      }),
      userLogin: build.mutation<LoginResponse, LoginRequest>({
        query: (body) => ({
          url: "/login",
          method: "post",
          data: body,
        }),
      }),
      getStories: build.query<StoriesResponse, GetStoriesParams>({
        query: ({ page, size, location = 0 }: GetStoriesParams) => {
          const params: Record<string, string | number> = {};

          if (page !== undefined) params.page = page;
          if (size !== undefined) params.size = size;
          params.location = location;

          return {
            url: "/stories",
            method: "get",
            params,
          };
        },
        keepUnusedDataFor: 0,
      }),
    };
  },
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetStoriesQuery,
} = storyApi;
