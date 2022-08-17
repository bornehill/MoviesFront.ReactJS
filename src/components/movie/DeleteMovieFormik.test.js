import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteMovieFormik from "./DeleteMovieFormik";

const handleCancel = jest.fn();
const handleCofirm = jest.fn();

test("DeleteMovie should be showed", async () => {
	render(
		<DeleteMovieFormik onCancel={handleCancel} onConfirm={handleCofirm} />
	);

	expect(screen.getByText("DELETE MOVIE")).toBeInTheDocument();

	userEvent.click(screen.getByText("CONFIRM"));
	await waitFor(() => expect(handleCofirm).toBeCalled());
});
