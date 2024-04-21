import { apiSlice } from "../api/apiSlice";

export const requestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    studentHistory: builder.query({
      query: ({ id }) => ({
        url: `/fetch-student-request/${id}`,
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

export const { useStudentHistoryQuery, useReadNotificationMutation } =
  requestsApi;
