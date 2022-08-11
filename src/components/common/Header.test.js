import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import Header from "./Header";

import store from "../../store/configureStore";

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
