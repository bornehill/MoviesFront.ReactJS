import React from "react";

const Header = () => {
	return (
		<header className="bg-movie-gray py-4">
			<div className="px-8 md:flex md:items-center md:justify-between">
				<div className="flex items-center">
					<span className="text-xl text-movie-red font-bold">netflix</span>
					<span className="font-light text-2xl text-movie-red">roulette</span>
				</div>
				<button
					className="btn button p-2 bg-movie-onyx text-movie-red font-light rounded"
					type="button"
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
					type="button"
					className="text-white bg-movie-red md:w-1/4 p-1 md:py-2 rounded"
				>
					SEARCH
				</button>
			</div>
		</header>
	);
};

export default Header;
