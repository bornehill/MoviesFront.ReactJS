import { renderHook } from "@testing-library/react";
import { useRuntime } from "./useRuntime";

test("Test custom hook", () => {
	const { result } = renderHook(() => useRuntime("120"));

	expect(result.current).toEqual("2hr 0min");
});
