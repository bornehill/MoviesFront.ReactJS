import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import Header from "./Header";

import store from "../../store/configureStore";

export const handlers = [
    rest.post(`${process.env.REACT_APP_API_URL}/movies`, (req, res, ctx) => {
    return res(ctx.status(200))
    })      
  ]
  
  const server = setupServer(...handlers)
  
  beforeAll(() => server.listen())
  
  afterEach(() => server.resetHandlers())
  
  afterAll(() => server.close())

test("Header should be showed", () => {
	const history = createMemoryHistory();
	
	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<Routes>
					<Route path="*" element={<Header />} />
				</Routes>
			</Provider>
		</HistoryRouter>
	);

	expect(screen.getByText("FIND YOUR MOVIE")).toBeInTheDocument();
});

test("Header should display Add movie and Cancel action", () => {
	const history = createMemoryHistory();

	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<Routes>
					<Route path="*" element={<Header />} />
				</Routes>
			</Provider>
		</HistoryRouter>
	);

	userEvent.click(screen.getByText("+ ADD MOVIE"));
	expect(screen.getByText("SUBMIT")).toBeInTheDocument();

	userEvent.click(screen.getByLabelText("cancel"));
	expect(screen.queryByText("SUBMIT")).toBeNull();
});

test("Header should display Add movie and throw Add action", async () => {
	const history = createMemoryHistory();

	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<Routes>
					<Route path="*" element={<Header />} />
				</Routes>
			</Provider>
		</HistoryRouter>
	);

	userEvent.click(screen.getByText("+ ADD MOVIE"));

	userEvent.type(screen.getByRole("textbox", { name: /title/i }), "new movie");
	userEvent.type(screen.getByRole("textbox", { name: /movie url/i }), "https://image.tmdb.org/t/p/w500/gW5MnkQ9zHtyVPzdDDHPEDCrZ57.jpg");
	userEvent.type(screen.getByRole("spinbutton", { name: /rating/i }), "8.0");
	userEvent.type(screen.getByRole("spinbutton", { name: /runtime/i }), "120");
	userEvent.type(screen.getByRole("textbox", { name: /overview/i }), "test new movie");
	
	act(() => { userEvent.click(screen.getByText("SUBMIT")) });
	await waitFor(() => expect(history.location.pathname).toBe("/"));
});

test("Header should search a movie", async () => {
	const history = createMemoryHistory();

	render(
		<HistoryRouter history={history}>
			<Provider store={store}>
				<Routes>
					<Route path="/search/:searchQuery" element={<Header />} />
					<Route path="*" element={<Header />} />
				</Routes>
			</Provider>
		</HistoryRouter>
	);

	const input = screen.getByPlaceholderText("What do you what to watch?");
	userEvent.type(input, "any");
	await waitFor(() => expect(input.value).toBe("any"));

	userEvent.click(screen.getByText("SEARCH"));
	await waitFor(() => expect(history.location.pathname).toBe("/search/any"));
});
