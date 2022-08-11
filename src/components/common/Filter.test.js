import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "./Filter";

const handleSort = jest.fn();
const handleFilter = jest.fn();

test("Filter should be showed", () => {
	render(
		<Filter sortBy={"genres"} onSort={handleSort} onFilter={handleFilter} />
	);

	expect(screen.getByText("SORT BY")).toBeInTheDocument();
});

test("Filter should be fired filter action", () => {
	render(
		<Filter sortBy={"genres"} onSort={handleSort} onFilter={handleFilter} />
	);

	userEvent.click(screen.getByText("DOCUMENTARY"));
	expect(handleFilter).toHaveBeenCalledTimes(1);
	userEvent.click(screen.getByText("ALL"));
	expect(handleFilter).toHaveBeenCalledTimes(2);
	userEvent.click(screen.getByText("COMEDY"));
	expect(handleFilter).toHaveBeenCalledTimes(3);
	userEvent.click(screen.getByText("HORROR"));
	expect(handleFilter).toHaveBeenCalledTimes(4);
	userEvent.click(screen.getByText("CRIME"));
	expect(handleFilter).toHaveBeenCalledTimes(5);
});

test("Filter should be fired sort action", () => {
	render(
		<Filter sortBy={"genres"} onSort={handleSort} onFilter={handleFilter} />
	);

	userEvent.selectOptions(screen.getByRole("combobox"), ["release_date"]);
	expect(handleSort).toHaveBeenCalledTimes(1);
});
