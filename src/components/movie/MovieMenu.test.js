import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieMenu from "./MovieMenu";

const handleDelete = jest.fn();
const handleEdit = jest.fn();

test("MovieMenu should be showed", () => {
	render(<MovieMenu show={true} onDelete={handleDelete} onEdit={handleEdit} />);

	expect(screen.queryByText("Edit")).toBeNull();
});

test("MovieMenu should show options", async () => {
	render(<MovieMenu show={true} onDelete={handleDelete} onEdit={handleEdit} />);

	expect(screen.queryByText("Edit")).toBeNull();

	userEvent.click(screen.getByLabelText("mnuopt"));
	await waitFor(() => expect(screen.queryByText("Edit")).toBeInTheDocument());
});
