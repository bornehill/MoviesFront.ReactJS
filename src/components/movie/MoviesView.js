import React, { useEffect, useState } from "react";

import LoadingBar from "../common/LoadingBar";
import MovieCard from "./MovieCard";

import MovieService from "../../services/movie.service";

const MoviesView = () => {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (movies.length) return;

		MovieService.getMovies()
			.then(({ data }) => {
				if (data) setMovies([...data.data]);
			})
			.finally(() => setIsLoading(false))
			.catch((err) => setError(err));
	}, [movies]);

	return (
		<React.Fragment>
			<div className="bg-movie-gray mt-5">
				{isLoading && <LoadingBar />}
				{error && (
					<p className="mt-2 text-sm p-2 text-white bg-red-700">{error}</p>
				)}
				<div className="flex flex-wrap">
					{movies.length > 0 &&
						movies.map((m) => <MovieCard key={m.id} movie={m} />)}
				</div>
			</div>
			;
		</React.Fragment>
	);
};

export default MoviesView;
