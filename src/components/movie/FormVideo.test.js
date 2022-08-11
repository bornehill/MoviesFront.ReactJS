import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormVideo from "./FormVideo";
import { movieEmpty } from "../../components/types/common";

const handleCancel = jest.fn();
const handleEdit = jest.fn();
const testMovie = { ...movieEmpty };

test("FormVideo should be showed", async () => {
	render(
		<FormVideo movie={testMovie} onCancel={handleCancel} onEdit={handleEdit} />
	);

	expect(screen.getByText("ADD MOVIE")).toBeInTheDocument();
	const titleInput = screen.getByRole("textbox", { name: /title/i });
	userEvent.type(titleInput, "new movie");
	await waitFor(() => expect(titleInput.value).toBe("new movie"));
});

test("FormVideo should reset values", async () => {
	render(
		<FormVideo movie={testMovie} onCancel={handleCancel} onEdit={handleEdit} />
	);

	expect(screen.getByText("ADD MOVIE")).toBeInTheDocument();
	const titleInput = screen.getByRole("textbox", { name: /title/i });
	userEvent.type(titleInput, "new movie");
	await waitFor(() => expect(titleInput.value).toBe("new movie"));

	const btnReset = screen.getByText("RESET");
	userEvent.click(btnReset);
	await waitFor(() => expect(titleInput.value).toBe(""));
});
