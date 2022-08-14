import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { MovieProvider } from "../../providers/Movie.provider";
import MovieCard from "./MovieCard";
import { movieEmpty } from "../../components/types/common";
import { createMemoryHistory } from "history";

const handleDelete = jest.fn();
const handleEdit = jest.fn();
const testMovie = {
	...movieEmpty,
	id: 334536,
	title: "The Blackcoat's Daughter",
	release_date: "2015-11-20",
	runtime: 93,
	poster_path:
		"https://image.tmdb.org/t/p/w500/gW5MnkQ9zHtyVPzdDDHPEDCrZ57.jpg",
};

test("MovieCard should be showed and match snapshot", () => {
	const card = render(
		<BrowserRouter>
			<MovieProvider>
				<Routes>
					<Route
						path="*"
						element={
							<MovieCard
								movie={testMovie}
								fnDelete={handleDelete}
								fnEdit={handleEdit}
							/>
						}
					/>
				</Routes>
			</MovieProvider>
		</BrowserRouter>
	);

	expect(screen.getByText("The Blackcoat's Daughter")).toBeInTheDocument();
	expect(card).toMatchSnapshot();
});

test("MovieCard should show details", async () => {
	const history = createMemoryHistory();

	render(
		<BrowserRouter history={history}>
			<MovieProvider>
				<Routes>
					<Route
						path="*"
						element={
							<MovieCard
								movie={testMovie}
								fnDelete={handleDelete}
								fnEdit={handleEdit}
							/>
						}
					/>
				</Routes>
			</MovieProvider>
		</BrowserRouter>
	);

	const movieImg = screen.getByRole("img");
	userEvent.click(movieImg);
	await waitFor(() => expect(history.location.pathname).toBe("/"));
});
