import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiSelectControl from "./MultiSelectControl";

const handleChange = jest.fn();
const movieGenre = ["Drama"];

test("MultiSelectControl should be showed", () => {
	render(
		<MultiSelectControl
			name="genres"
			label="GENRE"
			placeHolder="Select Genre"
			origin={movieGenre}
			onChange={handleChange}
		/>
	);

	expect(screen.getByText("GENRE")).toBeInTheDocument();
});

test("MultiSelectControl should open options", async () => {
	render(
		<MultiSelectControl
			name="genres"
			label="GENRE"
			placeHolder="Select Genre"
			origin={movieGenre}
			onChange={handleChange}
		/>
	);

	userEvent.click(screen.getByLabelText("dropdownrow"));
	await waitFor(() => expect(screen.getByText("Romance")).toBeInTheDocument());
	const chkGenre = screen.getByText("Romance").querySelector("input");
	userEvent.click(chkGenre);
	await waitFor(() => expect(chkGenre.checked).toBe(true));
});
