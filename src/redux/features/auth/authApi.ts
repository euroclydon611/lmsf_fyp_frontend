import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLogin, userLogout } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type LoginResponse = {
  user: any;
  accessToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const results = await queryFulfilled;
          dispatch(
            userRegistration({
              access_token: results.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation<LoginResponse, any>({
      query: ({ index_no, password }) => ({
        url: "login",
        method: "POST",
        body: { index_no, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const results = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: results.data.accessToken,
              user: results.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted({ dispatch }) {
        try {
          dispatch(userLogout());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutQuery } =
  authApi;
