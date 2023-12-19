"use client";

import React from "react";
import {
	Control,
	Controller,
	FieldValues,
	Path,
	FieldErrors,
} from "react-hook-form";
import {
	DatePicker as MUIDatePicker,
	DateView,
	DatePickerProps as MUIDatePickerProps,
	LocalizationProvider,
} from "@mui/x-date-pickers";
import {
	FormControl,
	FormControlProps,
	PopperPlacementType,
} from "@mui/material";
import { AppErrorMessage } from "../AppErrorMessage/AppErrorMessage";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";

interface AppDatePickerProps<FormValuesType extends FieldValues> {
	name: Path<FormValuesType>;
	label: string;
	control: Control<FormValuesType>;

	errors: FieldErrors<FormValuesType>;
	showErrorMessage?: boolean;

	fullWidth?: boolean;
	required?: boolean;

	disableFuture?: boolean;
	maxDate?: Date;
	minDate?: Date;
	views?: DateView[];
	format?: string;
	openTo?: DateView;
	placement?: PopperPlacementType;

	formControlProps?: Omit<
		FormControlProps,
		"required" | "variant" | "fullWidth" | "error" | "size" | "autoFocus"
	>;
	datePickerProps?: Omit<
		MUIDatePickerProps<Date>,
		| "label"
		| "disableFuture"
		| "maxDate"
		| "minDate"
		| "views"
		| "format"
		| "openTo"
		| "onChange"
		| "ref"
		| "value"
		| "slotProps"
	>;
}

export const AppDatePicker = <FormValuesType extends FieldValues>({
	name,
	control,
	label,

	errors,
	showErrorMessage = true,

	fullWidth = true,
	required = true,

	disableFuture = false,
	format,
	minDate,
	maxDate,
	openTo,
	views,
	placement,

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
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Controller
					name={name}
					control={control}
					render={({ field }) => {
						return (
							<MUIDatePicker
								label={label}
								disableFuture={disableFuture}
								maxDate={maxDate}
								minDate={minDate}
								format={format || "dd/MM/yyyy"}
								views={views}
								openTo={openTo}
								sx={{ width: "100%", ...sx }}
								{...field}
								value={parseISO(field.value) || null}
								{...restDatePickerProps}
							/>
						);
					}}
				/>

				{showErrorMessage && (
					<AppErrorMessage id={`${name}-error`} name={name} errors={errors} />
				)}
			</LocalizationProvider>
		</FormControl>
	);
};
