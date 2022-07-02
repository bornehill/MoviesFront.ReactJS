import React, { useContext } from "react";

import Header from "../common/Header";
import MovieDetails from "../movie/MovieDetails";
import MoviesView from "../movie/MoviesView";
import { MovieContext } from "../../providers/Movie.provider";

const Home = () => {
	const { movieDetail } = useContext(MovieContext);

	return (
		<>
			{!movieDetail && <Header />}
			{movieDetail && <MovieDetails />}
			<MoviesView />
		</>
	);
};

export default Home;
