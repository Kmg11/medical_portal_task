import React from "react";
import {
	Controller,
	Control,
	FieldErrors,
	Path,
	FieldValues,
} from "react-hook-form";
import { AppErrorMessage } from "../AppErrorMessage/AppErrorMessage";
import {
	FormControl,
	InputLabel,
	MenuItem,
	MenuItemProps,
	Select,
	SelectProps,
	FormControlProps,
	InputLabelProps,
} from "@mui/material";

interface SelectItemsType {
	value: string;
	label: string;
}

interface AppSelectDropdownProps<FormValuesType extends FieldValues> {
	id: string;
	name: Path<FormValuesType>;
	label: string;
	items: SelectItemsType[];
	control: Control<FormValuesType>;

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
	selectProps?: Omit<
		SelectProps,
		| "labelId"
		| "id"
		| "label"
		| "fullWidth"
		| "required"
		| "error"
		| "onChange"
		| "onBlur"
		| "name"
		| "value"
		| "ref"
	>;
	itemProps?: Omit<MenuItemProps, "value" | "key">;
}

export const AppSelectDropdown = <FormValuesType extends FieldValues>({
	id,
	name,
	label,
	items,
	control,

	errors,
	showErrorMessage = true,

	required = false,
	fullWidth = true,

	formControlProps,
	labelProps,
	selectProps,
	itemProps,
}: AppSelectDropdownProps<FormValuesType>) => {
	const hasError = errors[name] ? true : false;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<FormControl
					variant="outlined"
					fullWidth={fullWidth}
					required={required}
					error={hasError}
					{...formControlProps}
				>
					<InputLabel
						id={`${id}-label`}
						htmlFor={id}
						variant="outlined"
						required={required}
						error={hasError}
						{...labelProps}
					>
						{label}
					</InputLabel>

					<Select
						labelId={`${id}-label`}
						id={id}
						label={label}
						{...field}
						fullWidth={fullWidth}
						required={required}
						error={hasError}
						{...selectProps}
					>
						{items.map((item) => (
							<MenuItem key={item.value} value={item.value} {...itemProps}>
								{item.label}
							</MenuItem>
						))}
					</Select>

					{showErrorMessage && (
						<AppErrorMessage id={`${id}-error`} name={name} errors={errors} />
					)}
				</FormControl>
			)}
		/>
	);
};
