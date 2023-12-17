"use client";
import React from "react";
import { Box, FormHelperText, Grid } from "@mui/material";
import { useSignupForm } from "./useSignupForm";
import { AppEmailInput, AppSelectDropdown, AppSubmitButton } from "@/shared";
import { NameFields } from "./NameFields/NameFields";
import { PasswordFields } from "./PasswordFields/PasswordFields";

export const SignupForm = () => {
	const {
		errors,
		control,
		onSubmit,
		register,
		isLoading,
		isApiError,
		apiError,
	} = useSignupForm();

	return (
		<Box component="form" onSubmit={onSubmit} noValidate>
			<Grid container spacing={3}>
				<NameFields errors={errors} register={register} />

				<Grid item xs={12}>
					<AppEmailInput
						id="email"
						name="email"
						label={"Email"}
						register={register}
						errors={errors}
						fullWidth
						required
						inputProps={{ autoComplete: "email" }}
					/>
				</Grid>

				<PasswordFields errors={errors} register={register} />

				<Grid item xs={12}>
					<AppSelectDropdown
						id="role"
						name="role"
						label={"Role"}
						control={control}
						items={[
							{ label: "Patient", value: "patient" },
							{ label: "Doctor", value: "doctor" },
						]}
						errors={errors}
						required
						fullWidth
					/>
				</Grid>
			</Grid>

			<AppSubmitButton
				loading={isLoading}
				buttonProps={{ sx: { mt: 2 }, fullWidth: true }}
			>
				Signup
			</AppSubmitButton>

			{isApiError && apiError && (
				<FormHelperText error sx={{ mt: 2 }}>
					{apiError.message}
				</FormHelperText>
			)}
		</Box>
	);
};
