import React, { useContext } from "react";

import HeaderNext from "../common/HeaderNext";
import MovieDetailsNext from "../movie/MovieDetailsNext";
import MoviesViewNext from "../movie/MoviesViewNext";
import { MovieContext } from "../../providers/Movie.provider";
import { useRouter } from "next/router";

const HomeNext = () => {
	const router = useRouter();
	const { movieDetailId } = useContext(MovieContext);
	console.log(router.query);
	const { searchQuery, genre, sortBy, movieId } = router.query;

	return (
		<>
			{!(movieDetailId || movieId) && <HeaderNext />}
			{(movieDetailId || movieId) && <MovieDetailsNext movieId={movieId} />}
			<MoviesViewNext
				searchQuery={searchQuery}
				filterQuery={genre}
				sortQuery={sortBy}
			/>
		</>
	);
};

export default HomeNext;
