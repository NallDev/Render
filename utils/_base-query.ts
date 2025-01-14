import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseService: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = await AsyncStorage.getItem("token");
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://story-api.dicoding.dev/v1/",
    prepareHeaders(headers) {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    responseHandler: (response) => response.json(),
  });

  const modifiedArgs = {
    ...(typeof args === "string" ? { url: args } : args),
  };

  return baseQuery(modifiedArgs, api, extraOptions);
};
