import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
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

export const handlers = [
	rest.get(`${process.env.REACT_APP_API_URL}/movies/:id`, (req, res, ctx) => {
	  return res(ctx.json(testMovie), ctx.status(200))
	})
  ]
  
  const server = setupServer(...handlers)
  
  beforeAll(() => server.listen())
  
  afterEach(() => server.resetHandlers())
  
  afterAll(() => server.close())

test("MovieDetails should be showed", async () => {
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

test("MovieDetails should be closed", async () => {
	const history = createMemoryHistory();

	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<MovieProvider>
					<Routes>
						<Route path="*" element={<MovieDetails movieId={1} />} />
					</Routes>
				</MovieProvider>
			</Provider>
		</HistoryRouter>
	);

	await waitFor(() =>
		expect(screen.getByText("The Blackcoat's Daughter")).toBeInTheDocument()
	);

	userEvent.click(screen.getByLabelText("closedetail"));
	await waitFor(() => expect(history.location.pathname).toBe("/search"));	
});
