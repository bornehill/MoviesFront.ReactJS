import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
	tagTypes: ["Movies"],
	endpoints: (builder) => ({
		getMovies: builder.query({
			query: ({ filter, sortBy }) =>
				`/movies?filter=${filter}&sortBy=${sortBy}&sortOrder=desc`,
			transformResponse: (responseData) => {
				return responseData.data;
			},
			providesTags: ["Movies"],
		}),
		deleteMovie: builder.mutation({
			query: (movie) => ({
				url: `/movies/${movie.id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Movies"],
		}),
		editMovie: builder.mutation({
			query: (movie) => ({
				url: "/movies",
				method: "PUT",
				body: movie,
			}),
			invalidatesTags: ["Movies"],
		}),
		addMovie: builder.mutation({
			query: (movie) => ({
				url: "/movies",
				method: "POST",
				body: movie,
			}),
			invalidatesTags: ["Movies"],
		}),
	}),
});

export const {
	useGetMoviesQuery,
	useEditMovieMutation,
	useDeleteMovieMutation,
	useAddMovieMutation,
} = apiSlice;
