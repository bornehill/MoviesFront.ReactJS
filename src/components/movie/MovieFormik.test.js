import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieFormik from "./MovieFormik";
import { movieEmpty } from "../../components/types/common";

const handleCancel = jest.fn();
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

test("MovieFormik should be showed", async () => {
	render(
		<MovieFormik
			movie={testMovie}
			onCancel={handleCancel}
			onEdit={handleEdit}
		/>
	);

	await waitFor(() => expect(screen.getByText("EDIT MOVIE")).toBeInTheDocument());

	userEvent.click(screen.getByText("SUBMIT"));

	await waitFor(() => expect(handleEdit).not.toBeCalled());
});
