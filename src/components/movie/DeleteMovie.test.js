import { render, screen } from "@testing-library/react";
import DeleteMovie from "./DeleteMovie";

const handleCancel = jest.fn();
const handleCofirm = jest.fn();

test("DeleteMovie should be showed", () => {
	render(<DeleteMovie onCancel={handleCancel} onConfirm={handleCofirm} />);

	expect(screen.getByText("DELETE MOVIE")).toBeInTheDocument();
});
