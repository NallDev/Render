import { AddStoryRequest, AddStoryResponse } from "@/model/AddStoryModel";
import { LoginRequest, LoginResponse } from "@/model/loginModel";
import { RegisterRequest, RegisterResponse } from "@/model/registerModel";
import { GetStoriesParams, StoriesResponse } from "@/model/StoriesModel";
import { baseService } from "@/utils/_base-query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const storyApi = createApi({
  reducerPath: "storyApi",
  baseQuery: baseService,
  endpoints(build) {
    return {
      userRegister: build.mutation<RegisterResponse, RegisterRequest>({
        query: (body) => {
          console.log("liat lognya ", body);
          return {
            url: "/register",
            method: "post",
            body: body,
          };
        },
      }),
      userLogin: build.mutation<LoginResponse, LoginRequest>({
        query: (body) => ({
          url: "/login",
          method: "post",
          body: body,
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
      addStory: build.mutation<AddStoryResponse, AddStoryRequest>({
        query: (body) => {
          const formData = new FormData();
          formData.append("description", body.description);
          formData.append("photo", body.photo);
          if (body.lat !== undefined) formData.append("lat", String(body.lat));
          if (body.lon !== undefined) formData.append("lon", String(body.lon));

          return {
            url: "/stories",
            method: "post",
            body: formData,
          };
        },
      }),
    };
  },
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetStoriesQuery,
  useAddStoryMutation,
} = storyApi;
