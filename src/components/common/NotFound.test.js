import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

test("NotFound should be showed", () => {
	render(<NotFound />);

	expect(screen.getByText("Page not found")).toBeInTheDocument();
});
