import React, { useState } from "react";

import { useAddMovieMutation } from "../../reducers/movieSlice";

import SuccessMsg from "../movie/SuccessMsg";
import FormVideo from "../movie/FormVideo";
import { movieEmpty } from "../../components/types/common";

const Header = () => {
	const [addMovie, { error }] = useAddMovieMutation();
	const [showMsg, setShowMsg] = useState(false);
	const [newMovie, setNewMovie] = useState();

	const closeMsg = () => {
		setShowMsg(false);
	};

	const CancelAdd = () => {
		setNewMovie();
	};

	const onAddMovie = () => {
		setNewMovie({ ...movieEmpty });
	};

	const ConfirmAdd = async (movie) => {
		movie.vote_average = +movie.vote_average;
		movie.runtime = +movie.runtime;

		await addMovie(movie);
		setNewMovie();
		if (!error) setShowMsg(true);
	};

	return (
		<>
			{showMsg && (
				<SuccessMsg
					title={"CONGRATULATIONS!"}
					subTitle={"The movie has been added to database successfully"}
					onCancel={closeMsg}
				/>
			)}
			{newMovie && (
				<FormVideo movie={newMovie} onCancel={CancelAdd} onEdit={ConfirmAdd} />
			)}
			{error && (
				<p className="mt-2 text-sm p-2 text-white bg-red-700">{error}</p>
			)}
			<header className="bg-movie-gray py-4">
				<div className="px-8 md:flex md:items-center md:justify-between">
					<div className="flex items-center">
						<span className="text-xl text-movie-red font-bold">netflix</span>
						<span className="font-light text-2xl text-movie-red">roulette</span>
					</div>
					<button
						className="btn button p-2 bg-movie-onyx text-movie-red font-light rounded"
						onClick={onAddMovie}
					>
						+ ADD MOVIE
					</button>
				</div>
				<h2 className="text-4xl font-light text-white mr-2 md:mx-32 py-4 md:py-3 px-2 md:px-0">
					FIND YOUR MOVIE
				</h2>
				<div className="max-w-full md:mx-32">
					<input
						id="search"
						className="text-white bg-movie-onyx mx-2 md:mr-4 md:w-2/3"
						placeholder="What do you what to watch?"
					/>
					<button
						id="btnSearch"
						className="text-white bg-movie-red md:w-1/4 p-1 md:py-2 rounded"
					>
						SEARCH
					</button>
				</div>
			</header>
		</>
	);
};

export default Header;
