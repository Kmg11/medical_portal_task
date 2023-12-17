import React from "react";
import { AppPasswordInput } from "@/shared";
import { Grid } from "@mui/material";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SignupFormValues } from "../useSignupForm";

interface PasswordFieldsProps {
	register: UseFormRegister<SignupFormValues>;
	errors: FieldErrors<SignupFormValues>;
}

export const PasswordFields = ({ errors, register }: PasswordFieldsProps) => {
	return (
		<>
			<Grid item xs={12}>
				<AppPasswordInput
					id="password"
					name="password"
					label="Password"
					register={register}
					errors={errors}
					fullWidth
					required
					inputProps={{ autoComplete: "new-password" }}
				/>
			</Grid>

			<Grid item xs={12}>
				<AppPasswordInput
					id="confirmPassword"
					name="confirmPassword"
					label="Confirm Password"
					register={register}
					errors={errors}
					fullWidth
					required
					inputProps={{ autoComplete: "new-password" }}
				/>
			</Grid>
		</>
	);
};
