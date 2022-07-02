import React, { useState } from "react";

import MovieMenu from "./MovieMenu";

const MovieCard = ({ movie, fnDelete, fnEdit }) => {
	const [showMenu, setShowMenu] = useState(false);

	const displayMenu = (show) => {
		setShowMenu(show);
	};

	return (
		<div
			className="card card-white max-w-sm m-5"
			onMouseOver={() => displayMenu(true)}
			onMouseLeave={() => displayMenu(false)}
		>
			<MovieMenu
				show={showMenu}
				onDelete={() => fnDelete(movie.id)}
				onEdit={() => fnEdit(movie)}
			/>
			<img className="w-full rounded-t-sm" alt="" src={movie.poster_path} />
			<div className="px-4 py-2 flex justify-between">
				<div>
					<p className="font-light">{movie.title}</p>
					<p className="font-light">
						{movie.genres?.map((g) => {
							return g + ", ";
						})}
					</p>
				</div>
				<p className="border-2 border-movie-onyx p-1 font-light">
					{new Date(movie.release_date).getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default MovieCard;
