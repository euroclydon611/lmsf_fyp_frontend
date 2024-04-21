import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    notificationList: builder.query({
      query: ({ id }) => ({
        url: `/notifications/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    readNotification: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notifications`,
        method: "PATCH",
        body: { notificationId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useNotificationListQuery, useReadNotificationMutation } =
  notificationApi;
