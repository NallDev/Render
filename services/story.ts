import { LoginRequest, LoginResponse } from "@/model/loginModel";
import { RegisterRequest, RegisterResponse } from "@/model/registerModel";
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
    };
  },
});

export const { useUserRegisterMutation, useUserLoginMutation } = storyApi;
