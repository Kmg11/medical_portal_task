"use client";
import React from "react";
import { Box, FormHelperText } from "@mui/material";
import { AppEmailInput, AppPasswordInput, AppSubmitButton } from "@/shared";
import { useSigninForm } from "./useSigninForm";

export const SigninForm = () => {
	const { register, errors, onSubmit, isLoading, apiError } = useSigninForm();

	return (
		<Box component="form" onSubmit={onSubmit} sx={{ mb: 2 }} noValidate>
			<AppEmailInput
				id="email"
				name="email"
				label={"Email"}
				register={register}
				errors={errors}
				required
				fullWidth
				formControlProps={{ margin: "normal", sx: { mb: 3 } }}
				inputProps={{ autoComplete: "current-email" }}
			/>

			<AppPasswordInput
				id="password"
				name="password"
				label={"Password"}
				register={register}
				errors={errors}
				required
				fullWidth
				formControlProps={{ sx: { mb: 2 } }}
				inputProps={{ autoComplete: "current-password" }}
			/>

			<AppSubmitButton loading={isLoading} buttonProps={{ fullWidth: true }}>
				Signin
			</AppSubmitButton>

			{apiError && (
				<FormHelperText error sx={{ mt: 2 }}>
					Invalid Credentials
				</FormHelperText>
			)}
		</Box>
	);
};
