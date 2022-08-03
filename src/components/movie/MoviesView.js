import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "../common/LoadingBar";
import MovieCard from "./MovieCard";
import Filter from "../common/Filter";

import {
	useGetMoviesQuery,
	useDeleteMovieMutation,
	useEditMovieMutation,
} from "../../reducers/movieSlice";

import DeleteMovieFormik from "./DeleteMovieFormik";
import MovieFormik from "./MovieFormik";

const MoviesView = ({ searchQuery, filterQuery, sortQuery }) => {
	const navigate = useNavigate();
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
		navigate(`/search${filter ? `?genre=${filter}` : ""}`);
	};

	const SortHandler = (sort) => {
		setSortBy(sort);
		navigate(`/search${sort ? `?sortBy=${sort}` : ""}`);
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
				{error && (
					<p className="mt-2 text-sm p-2 text-white bg-red-700">{error}</p>
				)}
				<div className="flex flex-wrap">
					{movies?.length > 0 &&
						movies.map((m) => (
							<MovieCard
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
