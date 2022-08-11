import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

test("Test ErrorBoundary", () => {
	const ThrowError = () => {
		throw new Error("Test");
	};

	render(
		<ErrorBoundary>
			<ThrowError />
		</ErrorBoundary>
	);

	expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
});
