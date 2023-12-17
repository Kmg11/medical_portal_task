import React from "react";
import {
	FormControl,
	InputLabel,
	IconButton,
	OutlinedInput,
	InputAdornment,
	FormControlProps,
	InputLabelProps,
	OutlinedInputProps,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
	UseFormRegister,
	FieldErrors,
	FieldValues,
	Path,
} from "react-hook-form";
import { useToggle } from "@/shared";
import { AppErrorMessage } from "../AppErrorMessage/AppErrorMessage";

type AppPasswordInputProps<FormValuesType extends FieldValues> = {
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
		"required" | "variant" | "fullWidth" | "error" | "size" | "autoFocus" // * Auto focus is not working use react-hook-form setFocus instead
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
		| "endAdornment"
	>;
};

export const AppPasswordInput = <FormValuesType extends FieldValues>({
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
}: AppPasswordInputProps<FormValuesType>) => {
	const [showPassword, toggleShowPassword] = useToggle(false);

	const hasError = errors[name] ? true : false;

	return (
		<FormControl
			variant="outlined"
			fullWidth={fullWidth}
			required={required}
			error={hasError}
			{...formControlProps}
		>
			<InputLabel
				htmlFor={id}
				variant="outlined"
				required={required}
				error={hasError}
				{...labelProps}
			>
				{label}
			</InputLabel>

			<OutlinedInput
				id={id}
				type={showPassword ? "text" : "password"}
				inputMode="text"
				{...register(name)}
				label={label}
				required={required}
				error={hasError}
				fullWidth={fullWidth}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label={"toggle password visibility"}
							onClick={() => toggleShowPassword()}
							onMouseDown={(e) => e.preventDefault()}
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
				{...inputProps}
			/>

			{showErrorMessage && (
				<AppErrorMessage id={`${id}-error`} name={name} errors={errors} />
			)}
		</FormControl>
	);
};
