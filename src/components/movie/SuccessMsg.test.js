import { render, screen } from "@testing-library/react";
import SuccessMsg from "./SuccessMsg";

const handleCancel = jest.fn();

test("SuccessMsg should be showed", () => {
	render(
		<SuccessMsg title={"Test"} subTitle={"Testing"} onCancel={handleCancel} />
	);

	expect(screen.getByText("Test")).toBeInTheDocument();
});
