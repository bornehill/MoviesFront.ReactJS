import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
	const [movieDetailId, setMovieDetailId] = useState();

	return (
		<MovieContext.Provider
			value={{
				movieDetailId,
				setMovieDetailId,
			}}
		>
			{children}
		</MovieContext.Provider>
	);
};
