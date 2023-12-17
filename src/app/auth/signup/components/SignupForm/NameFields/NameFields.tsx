import React from "react";
import { AppErrorMessage, AppTextInput } from "@/shared";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupFormValues } from "../useSignupForm";

type NameFieldsProps = {
	register: UseFormRegister<SignupFormValues>;
	errors: FieldErrors<SignupFormValues>;
};

export const NameFields = ({ register, errors }: NameFieldsProps) => {
	const { breakpoints } = useTheme();
	const isXSScreen = useMediaQuery(breakpoints.down("sm"));

	return (
		<>
			<Grid item xs={12} sm={6}>
				<AppTextInput
					id="firstName"
					name="firstName"
					label={"First name"}
					errors={errors}
					showErrorMessage={isXSScreen ? true : false}
					register={register}
					required
					fullWidth
					inputProps={{ autoComplete: "given-name" }}
				/>
			</Grid>

			<Grid item xs={12} sm={6}>
				<AppTextInput
					id="lastName"
					name="lastName"
					label={"Last name"}
					errors={errors}
					showErrorMessage={isXSScreen ? true : false}
					register={register}
					required
					fullWidth
					inputProps={{ autoComplete: "family-name" }}
				/>
			</Grid>

			{!isXSScreen && (
				<Grid item xs={12} sx={{ paddingTop: "0 !important" }}>
					<AppErrorMessage
						errors={errors}
						name="firstName"
						id="firstName-error"
					/>
					<AppErrorMessage
						errors={errors}
						name="lastName"
						id="lastName-error"
					/>
				</Grid>
			)}
		</>
	);
};
