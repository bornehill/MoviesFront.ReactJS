import React, { useState } from "react";
import { useRouter } from "next/router";
import LoadingBar from "../common/LoadingBar";
import MovieCardNext from "./MovieCardNext";
import Filter from "../common/Filter";

import {
	useGetMoviesQuery,
	useDeleteMovieMutation,
	useEditMovieMutation,
} from "../../reducers/movieSlice";

import DeleteMovieFormik from "./DeleteMovieFormik";
import MovieFormik from "./MovieFormik";

const MoviesView = ({ searchQuery, filterQuery, sortQuery }) => {
	const navigate = useRouter();
	const [deleteMovie] = useDeleteMovieMutation();
	const [editMovie] = useEditMovieMutation();
	const [sortBy, setSortBy] = useState(sortQuery ?? "release_date");
	const [filter, setFilter] = useState(filterQuery ?? "");
	const search = searchQuery ?? "";

	const {
		data: movies,
		isLoading,
		error,
	} = useGetMoviesQuery({ filter, sortBy, search });
	const [deleteMovieId, setDeleteMovieId] = useState();
	const [selectedMovie, setSelectedMovie] = useState();

	const onDeleteMovie = (movieId) => {
		setDeleteMovieId(movieId);
	};

	const onEditMovie = (movie) => {
		setSelectedMovie(movie);
	};

	const CancelDelete = () => {
		setDeleteMovieId();
	};

	const CancelEdit = () => {
		setSelectedMovie();
	};

	const ConfirmDelete = async () => {
		await deleteMovie({ id: deleteMovieId });
		setDeleteMovieId();
	};

	const ConfirmEdit = async (movie) => {
		await editMovie(movie);
		setSelectedMovie();
	};

	const FilterHandler = (filter) => {
		setFilter(filter);
		navigate.push(`/search${filter ? `?genre=${filter}` : ""}`);
	};

	const SortHandler = (sort) => {
		setSortBy(sort);
		navigate.push(`/search${sort ? `?sortBy=${sort}` : ""}`);
	};

	return (
		<React.Fragment>
			{deleteMovieId && (
				<DeleteMovieFormik onCancel={CancelDelete} onConfirm={ConfirmDelete} />
			)}
			{selectedMovie && (
				<MovieFormik
					movie={selectedMovie}
					onCancel={CancelEdit}
					onEdit={ConfirmEdit}
				/>
			)}
			<Filter sortBy={sortBy} onSort={SortHandler} onFilter={FilterHandler} />
			<div className="bg-movie-gray">
				{isLoading && <LoadingBar />}
				{error?.error && (
					<div>
						<p className="mt-2 text-sm p-2 text-white bg-red-700">
							{error.error}
						</p>
						<p className="mt-2 text-sm p-2 text-white bg-red-700">
							{error.data}
						</p>
					</div>
				)}
				<div className="flex flex-wrap">
					{movies?.length > 0 &&
						movies.map((m) => (
							<MovieCardNext
								key={m.id}
								movie={m}
								fnDelete={onDeleteMovie}
								fnEdit={onEditMovie}
							/>
						))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default MoviesView;
