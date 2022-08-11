import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "../../providers/Movie.provider";
import { Provider } from "react-redux";
import { movieEmpty } from "../../components/types/common";
import MovieDetails from "./MovieDetails";

import store from "../../store/configureStore";

const testMovie = {
	...movieEmpty,
	id: 334536,
	title: "The Blackcoat's Daughter",
	release_date: "2015-11-20",
	runtime: 93,
	poster_path:
		"https://image.tmdb.org/t/p/w500/gW5MnkQ9zHtyVPzdDDHPEDCrZ57.jpg",
};

xtest("MovieDetails should be showed", async () => {
	const spy = jest.spyOn(global, "fetch").mockResolvedValue({
		json: jest.fn().mockResolvedValue({ data: testMovie }),
	});

	render(
		<BrowserRouter>
			<Provider store={store}>
				<MovieProvider>
					<Routes>
						<Route path="*" element={<MovieDetails movieId={1} />} />
					</Routes>
				</MovieProvider>
			</Provider>
		</BrowserRouter>
	);

	await waitFor(() =>
		expect(screen.getByText("The Blackcoat's Daughter")).toBeInTheDocument()
	);
});
