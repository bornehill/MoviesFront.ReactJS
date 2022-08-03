import React, { useContext } from "react";

import Header from "../common/Header";
import MovieDetails from "../movie/MovieDetails";
import MoviesView from "../movie/MoviesView";
import { useParams, useLocation } from "react-router-dom";
import { MovieContext } from "../../providers/Movie.provider";

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
	const { movieDetailId } = useContext(MovieContext);
	const { searchQuery } = useParams();

	const query = useQuery();
	const genre = query.get("genre");
	const sortBy = query.get("sortBy");
	const movieId = query.get("movie");

	return (
		<>
			{!(movieDetailId || movieId) && <Header />}
			{(movieDetailId || movieId) && <MovieDetails movieId={movieId} />}
			<MoviesView
				searchQuery={searchQuery}
				filterQuery={genre}
				sortQuery={sortBy}
			/>
		</>
	);
};

export default Home;
