import React, { useContext } from "react";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { FiSearch } from "react-icons/fi";
import { MovieContext } from "../../providers/Movie.provider";
import { useRuntime } from "../../hooks/useRuntime";
import { useGetMovieByIdQuery } from "../../reducers/movieSlice";

const MovieDetails = ({ movieId }) => {
	const navigate = useRouter();
	const { movieDetailId, setMovieDetailId } = useContext(MovieContext);
	const { data: movieDetail } = useGetMovieByIdQuery({
		movieId: movieDetailId ?? movieId,
	});

	const runtime = useRuntime(movieDetail?.runtime);

	const resetMovie = () => {
		setMovieDetailId();
		navigate.push("/search");
	};

	return (
		<>
			{movieDetail && (
				<div className="bg-movie-gray">
					<div className="px-8 md:flex md:items-center md:justify-between">
						<div className="flex items-center">
							<span className="text-xl text-movie-red font-bold">netflix</span>
							<span className="font-light text-2xl text-movie-red">
								roulette
							</span>
						</div>
						<IconContext.Provider
							value={{
								className: "text-movie-red text-2xl",
							}}
						>
							<FiSearch
								style={{ transform: "rotate(90deg)" }}
								onClick={() => resetMovie()}
								aria-label="closedetail"
							/>
						</IconContext.Provider>
					</div>
					<div className="flex flex-row">
						<div className="w-1/4 p-10">
							<img alt="" src={movieDetail.poster_path} />
						</div>
						<div className="w-3/4 p-10">
							<div className="flex flex-row">
								<p className="font-light text-white text-4xl">
									{movieDetail.title}
								</p>
								<p className="font-light text-white text-2xl border rounded-full mx-2 p-2">
									{movieDetail.vote_average}
								</p>
							</div>
							<div className="text-movie-onyx">
								{movieDetail.genres?.map((g) => {
									return g + " & ";
								})}
							</div>
							<div className="text-movie-red font-thin text-2xl my-5">
								{new Date(movieDetail.release_date).getFullYear()} {runtime}
							</div>
							<p className="text-movie-onyx text-2xl font-thin">
								{movieDetail.overview}
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MovieDetails;
