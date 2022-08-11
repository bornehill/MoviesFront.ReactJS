import { Genres } from "../types/common";
import { mapEnumToDropdown } from "./mapEnum";

test("mapEnum should return dropdown format values from a enum", () => {
	const result = mapEnumToDropdown(Genres);

	expect(result[0].value).toBe("Drama");
});
