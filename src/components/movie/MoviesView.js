import React, { useState } from "react";

import LoadingBar from "../common/LoadingBar";
import MovieCard from "./MovieCard";
import Filter from "../common/Filter";

import {
	useGetMoviesQuery,
	useDeleteMovieMutation,
	useEditMovieMutation,
} from "../../reducers/movieSlice";

import DeleteMovie from "./DeleteMovie";
import FormVideo from "./FormVideo";

const MoviesView = () => {
	const [deleteMovie] = useDeleteMovieMutation();
	const [editMovie] = useEditMovieMutation();
	const [sortBy, setSortBy] = useState("release_date");
	const [filter, setFilter] = useState("");

	const {
		data: movies,
		isLoading,
		error,
	} = useGetMoviesQuery({ filter, sortBy });
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

	return (
		<React.Fragment>
			{deleteMovieId && (
				<DeleteMovie onCancel={CancelDelete} onConfirm={ConfirmDelete} />
			)}
			{selectedMovie && (
				<FormVideo
					movie={selectedMovie}
					onCancel={CancelEdit}
					onEdit={ConfirmEdit}
				/>
			)}
			<Filter sortBy={sortBy} onSort={setSortBy} onFilter={setFilter} />
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
