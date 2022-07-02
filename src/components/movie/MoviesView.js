import React, { useEffect, useState } from "react";

import LoadingBar from "../common/LoadingBar";
import MovieCard from "./MovieCard";

import MovieService from "../../services/movie.service";

import DeleteMovie from "./DeleteMovie";
import FormVideo from "./FormVideo";

const MoviesView = () => {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [deleteMovie, setDeleteMovie] = useState();
	const [editMovie, setEditMovie] = useState();

	useEffect(() => {
		if (movies.length) return;

		loadMovies();
	}, [movies]);

	const loadMovies = () => {
		MovieService.getMovies()
			.then(({ data }) => {
				if (data) setMovies([...data.data]);
			})
			.finally(() => setIsLoading(false))
			.catch((err) => setError(err));
	};

	const onDeleteMovie = (movieId) => {
		setDeleteMovie(movieId);
	};

	const onEditMovie = (movie) => {
		setEditMovie(movie);
	};

	const CancelDelete = () => {
		setDeleteMovie();
	};

	const CancelEdit = () => {
		setEditMovie();
	};

	const ConfirmDelete = () => {
		MovieService.deleteMovie(deleteMovie)
			.then(({ status }) => {
				if (status === 204) {
					loadMovies();
				}
			})
			.finally(() => setDeleteMovie())
			.catch((err) => setError(err));
	};

	const ConfirmEdit = (movie) => {
		MovieService.editMovie(movie)
			.then(({ status }) => {
				if (status === 200) {
					loadMovies();
				}
			})
			.finally(() => setEditMovie())
			.catch((err) => setError(err));
	};

	return (
		<React.Fragment>
			{deleteMovie && (
				<DeleteMovie onCancel={CancelDelete} onConfirm={ConfirmDelete} />
			)}
			{editMovie && (
				<FormVideo
					movie={editMovie}
					onCancel={CancelEdit}
					onEdit={ConfirmEdit}
				/>
			)}
			<div className="bg-movie-gray mt-5">
				{isLoading && <LoadingBar />}
				{error && (
					<p className="mt-2 text-sm p-2 text-white bg-red-700">{error}</p>
				)}
				<div className="flex flex-wrap">
					{movies.length > 0 &&
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
