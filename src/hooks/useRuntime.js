import { useMemo } from "react";

export const useRuntime = (runtime) => {
	const time = useMemo(
		() => `${Math.trunc(+runtime / 60)}hr ${+runtime % 60}min`,
		[runtime]
	);

	return time;
};
