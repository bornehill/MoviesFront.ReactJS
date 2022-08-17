import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter, unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { MovieProvider } from "../../providers/Movie.provider";
import { Provider } from "react-redux";
import { movieEmpty } from "../../components/types/common";
import MoviesView from "./MoviesView";

import store from "../../store/configureStore";

const testMovies = [{
	...movieEmpty,
	id: 334536,
	title: "The Blackcoat's Daughter",
	release_date: "2015-11-20",
	runtime: 93,
    vote_average: 8.9,
    overview: "Movie for testing",
	poster_path:
		"https://image.tmdb.org/t/p/w500/gW5MnkQ9zHtyVPzdDDHPEDCrZ57.jpg",
}];

export const handlers = [
	rest.get(`${process.env.REACT_APP_API_URL}/movies`, (req, res, ctx) => {
	  return res(ctx.json({ data: testMovies}), ctx.status(200))
	}),

	rest.delete(`${process.env.REACT_APP_API_URL}/movies/:id`, (req, res, ctx) => {
        return res(ctx.status(200))
      }),

    rest.put(`${process.env.REACT_APP_API_URL}/movies`, (req, res, ctx) => {
    return res(ctx.status(200))
    })      
  ]
  
  const server = setupServer(...handlers)
  
  beforeAll(() => server.listen())
  
  afterEach(() => server.resetHandlers())
  
  afterAll(() => server.close())

test("MoviesView should be showed", async () => {
	render(
		<BrowserRouter>
			<Provider store={store}>
				<MovieProvider>
					<Routes>
						<Route path="*" element={<MoviesView movieId={1} />} />
					</Routes>
				</MovieProvider>
			</Provider>
		</BrowserRouter>
	);

	await waitFor(() =>
		expect(screen.getByText("The Blackcoat's Daughter")).toBeInTheDocument()
	);
});

test("MoviesView should filter and order movies", async () => {
    const history = createMemoryHistory();

	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<MovieProvider>
					<Routes>
						<Route path="*" element={<MoviesView movieId={1} />} />
					</Routes>
				</MovieProvider>
			</Provider>
        </HistoryRouter>
	);

	await waitFor(() =>
		expect(screen.getByText("The Blackcoat's Daughter")).toBeInTheDocument()
	);

	userEvent.click(screen.getByText("HORROR"));
	await waitFor(() => expect(history.location.search).toBe("?genre=horror"));

    userEvent.selectOptions(screen.getByRole("combobox"), ["release_date"]);
    await waitFor(() => expect(history.location.search).toBe("?sortBy=release_date"));
});

test("MoviesView should open menu and click Delete", async () => {
    const history = createMemoryHistory();

	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<MovieProvider>
					<Routes>
						<Route path="*" element={<MoviesView movieId={1} />} />
					</Routes>
				</MovieProvider>
			</Provider>
        </HistoryRouter>
	);

	userEvent.hover(screen.getByText("The Blackcoat's Daughter"));
    userEvent.click(screen.getByLabelText("mnuopt"));
	await waitFor(() => expect(screen.getByText("Delete")).toBeInTheDocument());

    userEvent.click(screen.getByText("Delete"));
    await waitFor(() => expect(screen.getByText("DELETE MOVIE")).toBeInTheDocument());
    userEvent.click(screen.getByText("CONFIRM"));

    await waitFor(() => expect(history.location.pathname).toBe("/"));
});

test("MoviesView should open menu and click Edit", async () => {
    const history = createMemoryHistory();

	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<MovieProvider>
					<Routes>
						<Route path="*" element={<MoviesView movieId={1} />} />
					</Routes>
				</MovieProvider>
			</Provider>
        </HistoryRouter>
	);

	userEvent.hover(screen.getByText("The Blackcoat's Daughter"));
    userEvent.click(screen.getByLabelText("mnuopt"));
	await waitFor(() => expect(screen.getByText("Edit")).toBeInTheDocument());

    userEvent.click(screen.getByText("Edit"));
    await waitFor(() => expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument());

    userEvent.click(screen.getByText("SUBMIT"));
    await waitFor(() => expect(history.location.pathname).toBe("/"));
});