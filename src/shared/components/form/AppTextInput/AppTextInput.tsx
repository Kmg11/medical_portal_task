import React from "react";
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	OutlinedInputProps,
	FormControlProps,
	InputLabelProps,
} from "@mui/material";
import {
	FieldErrors,
	UseFormRegister,
	Path,
	FieldValues,
} from "react-hook-form";
import { AppErrorMessage } from "../AppErrorMessage/AppErrorMessage";

interface AppTextInputProps<FormValuesType extends FieldValues> {
	id: string;
	name: Path<FormValuesType>;
	label: string;
	register: UseFormRegister<FormValuesType>;

	errors: FieldErrors<FormValuesType>;
	showErrorMessage?: boolean;

	required?: boolean;
	fullWidth?: boolean;
	size?: OutlinedInputProps["size"];

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
}

export const AppTextInput = <FormValuesType extends FieldValues>({
	id,
	name,
	label,
	register,

	errors,
	showErrorMessage = true,

	required = false,
	fullWidth = true,
	size = "medium",

	formControlProps,
	labelProps,
	inputProps,
}: AppTextInputProps<FormValuesType>) => {
	const hasError = errors[name] ? true : false;

	return (
		<FormControl
			fullWidth={fullWidth}
			required={required}
			variant="outlined"
			error={hasError}
			size={size}
			{...formControlProps}
		>
			<InputLabel
				htmlFor={id}
				variant="outlined"
				error={hasError}
				required={required}
				size={size === "medium" ? "normal" : size}
				{...labelProps}
			>
				{label}
			</InputLabel>

			<OutlinedInput
				id={id}
				type="text"
				inputMode="text"
				{...register(name)}
				label={label}
				fullWidth={fullWidth}
				required={required}
				error={hasError}
				size={size}
				{...inputProps}
			/>

			{showErrorMessage && (
				<AppErrorMessage id={`${id}-error`} name={name} errors={errors} />
			)}
		</FormControl>
	);
};
