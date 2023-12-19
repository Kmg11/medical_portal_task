import React from "react";
import { FormHelperText, FormHelperTextProps } from "@mui/material";
import { FieldErrors, FieldValues, Path } from "react-hook-form";
import { red } from "@mui/material/colors";

type AppErrorMessageProps<FormValuesType extends FieldValues> = {
	id: string;
	name: Path<FormValuesType>;
	errors: FieldErrors<FormValuesType>;
	testProps?: Omit<FormHelperTextProps, "variant" | "id">;
};

export const AppErrorMessage = <FormValuesType extends FieldValues>({
	id,
	name,
	errors,
	testProps,
}: AppErrorMessageProps<FormValuesType>) => {
	const { sx, ...restTextProps } = testProps || {};

	const error = getValue<FormValuesType>(errors, name.split("."));
	const hasError = error ? true : false;

	return hasError ? (
		<FormHelperText
			variant="outlined"
			id={`${id}-error-text`}
			sx={{ mt: 1, color: red[600], ...sx }}
			{...restTextProps}
		>
			<>* {error?.message}</>
		</FormHelperText>
	) : null;
};

function getValue<FormValuesType extends FieldValues>(
	obj: FieldErrors<FormValuesType>,
	keys: string[]
) {
	let result = obj;

	for (const key of keys) {
		if (result && result.hasOwnProperty(key)) {
			result = result[key] as any;
		} else {
			return undefined;
		}
	}

	return result;
}
