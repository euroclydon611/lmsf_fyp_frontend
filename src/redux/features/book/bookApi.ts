import { apiSlice } from "../api/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: ({
        images,
        title,
        authors,
        description,
        publicationDate,
        publisher,
        category,
        pages,
        totalStock,
        availableStock,
        patronId,
      }) => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("authors", authors);
        formData.append("description", description);
        formData.append("publicationDate", publicationDate);
        formData.append("category", category);
        formData.append("publisher", publisher);
        formData.append("pages", pages);
        formData.append("totalStock", totalStock);
        formData.append("availableStock", availableStock);
        formData.append("patronId", patronId);
        images.forEach((file: any) => {
          formData.append("files", file);
        });
        return {
          url: "/create-book",
          method: "POST",
          body: formData,
          credentials: "include" as const,
        };
      },
    }),

    getAllBooks: builder.query({
      query: ({ sortOrder, sortField, limit, page, searchTerm }) => ({
        url: `/get-all-books?page=${page}&limit=${limit}&search=${searchTerm}&sortOrder=${sortOrder}&sortField=${sortField}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    requestBook: builder.mutation({
      query: ({ userId, bookId }) => ({
        url: `/make-request`,
        method: "POST",
        body: { userId, bookId },
        credentials: "include" as const,
      }),
    }),

    approveRequest: builder.mutation({
      query: ({ requestId, patronId }) => ({
        url: `/approve-request`,
        method: "POST",
        body: { requestId, patronId },
        credentials: "include" as const,
      }),
    }),

    checkoutBook: builder.mutation({
      query: ({ requestId, patronId, inPrevDate }) => ({
        url: `/checkout-request`,
        method: "POST",
        body: { requestId, patronId, inPrevDate },
        credentials: "include" as const,
      }),
    }),

    checkInBook: builder.mutation({
      query: ({ requestId, patronId }) => ({
        url: `/checkin`,
        method: "POST",
        body: { requestId, patronId },
        credentials: "include" as const,
      }),
    }),

    getAllRequests: builder.query({
      query: ({ userId }) => ({
        url: `/get-all-requests/${userId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getRequestsByStatus: builder.query({
      query: ({ status, userId }) => ({
        url: `/request-status/${status}/${userId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useRequestBookMutation,
  useApproveRequestMutation,
  useCheckoutBookMutation,
  useCheckInBookMutation,
  useGetRequestsByStatusQuery,
  useGetAllRequestsQuery,
} = bookApi;
