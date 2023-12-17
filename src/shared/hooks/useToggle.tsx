"use client";
import { useState } from "react";

export function useToggle(
	defaultValue = false
): [boolean, (newValue?: boolean) => void] {
	const [value, setValue] = useState(defaultValue);

	function toggleValue(newValue?: unknown) {
		if (newValue !== value) {
			setValue((currentValue) =>
				typeof newValue === "boolean" ? newValue : !currentValue
			);
		}
	}

	return [value, toggleValue];
}
