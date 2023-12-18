"use client";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	FieldErrors,
} from "react-hook-form";
import {
	DateTimePicker as MUIDateTimePicker,
	DateTimePickerProps as MUIDateTimePickerProps,
	LocalizationProvider,
} from "@mui/x-date-pickers";
import { FormControl, FormControlProps } from "@mui/material";
import { AppErrorMessage } from "../AppErrorMessage/AppErrorMessage";
import { parseISO } from "date-fns";

interface AppDatePickerProps<FormValuesType extends FieldValues> {
	name: Path<FormValuesType>;
	label: string;
	control: Control<FormValuesType>;

	errors: FieldErrors<FormValuesType>;
	showErrorMessage?: boolean;

	fullWidth?: boolean;
	required?: boolean;
	minDate?: Date;

	formControlProps?: Omit<
		FormControlProps,
		"required" | "variant" | "fullWidth" | "error" | "size" | "autoFocus"
	>;
	datePickerProps?: Omit<
		MUIDateTimePickerProps<Date>,
		"label" | "minDate" | "onChange" | "ref" | "value"
	>;
}

export const AppDateTimePickerInput = <FormValuesType extends FieldValues>({
	name,
	control,
	label,
	minDate,

	errors,
	showErrorMessage = true,

	fullWidth = true,
	required = true,

	formControlProps,
	datePickerProps,
}: AppDatePickerProps<FormValuesType>) => {
	const { sx, ...restDatePickerProps } = datePickerProps || {};

	const hasError = errors[name] ? true : false;

	return (
		<FormControl
			fullWidth={fullWidth}
			required={required}
			variant="outlined"
			error={hasError}
			{...formControlProps}
		>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<MUIDateTimePicker
							label={label}
							minDate={minDate}
							{...field}
							value={parseISO(field.value) || null}
							{...restDatePickerProps}
						/>
					</LocalizationProvider>
				)}
			/>

			{showErrorMessage && (
				<AppErrorMessage id={`${name}-error`} name={name} errors={errors} />
			)}
		</FormControl>
	);
};
