import React from "react";
import {
	FormControlProps,
	InputLabelProps,
	OutlinedInputProps,
	FormControl,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import {
	FieldErrors,
	UseFormRegister,
	Path,
	FieldValues,
} from "react-hook-form";
import { AppErrorMessage } from "../AppErrorMessage/AppErrorMessage";

type AppEmailInputProps<FormValuesType extends FieldValues> = {
	id: string;
	name: Path<FormValuesType>;
	label: string;
	register: UseFormRegister<FormValuesType>;

	errors: FieldErrors<FormValuesType>;
	showErrorMessage?: boolean;

	required?: boolean;
	fullWidth?: boolean;

	formControlProps?: Omit<
		FormControlProps,
		"required" | "variant" | "fullWidth" | "error" | "size" | "autoFocus"
	>;
	labelProps?: Omit<
		InputLabelProps,
		"htmlFor" | "variant" | "error" | "required" | "id" | "size"
	>;
	inputProps?: Omit<
		OutlinedInputProps,
		| "id"
		| "type"
		| "name"
		| "label"
		| "required"
		| "fullWidth"
		| "inputMode"
		| "error"
		| "onBlur"
		| "onChange"
		| "ref"
		| "autoFocus"
		| "size"
	>;
};

export const AppEmailInput = <FormValuesType extends FieldValues>({
	id,
	name,
	label,
	register,

	errors,
	showErrorMessage = true,

	required = false,
	fullWidth = true,

	formControlProps,
	labelProps,
	inputProps,
}: AppEmailInputProps<FormValuesType>) => {
	const hasError = errors[name] ? true : false;

	return (
		<FormControl
			fullWidth={fullWidth}
			required={required}
			variant="outlined"
			error={hasError}
			{...formControlProps}
		>
			<InputLabel
				htmlFor={id}
				variant="outlined"
				error={hasError}
				required={required}
				{...labelProps}
			>
				{label}
			</InputLabel>

			<OutlinedInput
				id={id}
				type="email"
				inputMode="email"
				{...register(name)}
				label={label}
				fullWidth={fullWidth}
				required={required}
				error={hasError}
				{...inputProps}
			/>

			{showErrorMessage && (
				<AppErrorMessage id={`${id}-error`} name={name} errors={errors} />
			)}
		</FormControl>
	);
};
