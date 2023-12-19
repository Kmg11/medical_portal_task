"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { MedicalRecordSectionHeader } from "../../MedicalRecordSectionHeader/MedicalRecordSectionHeader";
import { MedicalRecordSection } from "../../MedicalRecordSection/MedicalRecordSection";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import {
	AppDatePicker,
	AppErrorMessage,
	AppSelectDropdown,
	AppTextInput,
} from "@/shared";
import { CreateOrEditMedicalRecordSchemaType } from "../createOrEditMedicalRecord.schema";

export const PatientInformation = () => {
	const { register, control, formState } =
		useFormContext<CreateOrEditMedicalRecordSchemaType>();
	const { breakpoints } = useTheme();

	const isXSScreen = useMediaQuery(breakpoints.down("sm"));

	return (
		<MedicalRecordSection>
			<MedicalRecordSectionHeader>
				Patient Information
			</MedicalRecordSectionHeader>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="firstName"
						name="patientInformation.firstName"
						label="First name"
						errors={formState.errors}
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
						name="patientInformation.lastName"
						label={"Last name"}
						errors={formState.errors}
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
							errors={formState.errors}
							name="patientInformation.firstName"
							id="firstName-error"
						/>

						<AppErrorMessage
							errors={formState.errors}
							name="patientInformation.lastName"
							id="lastName-error"
						/>
					</Grid>
				)}

				<Grid item xs={12} sm={6}>
					<AppSelectDropdown
						id="gender"
						name="patientInformation.gender"
						label="Gender"
						control={control}
						items={[
							{ label: "Male", value: "male" },
							{ label: "Female", value: "female" },
						]}
						errors={formState.errors}
						fullWidth
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<AppDatePicker
						control={control}
						label="Date of birth"
						errors={formState.errors}
						showErrorMessage={isXSScreen ? true : false}
						disableFuture={true}
						views={["year", "month", "day"]}
						openTo="year"
						format="dd/MM/yyyy"
						name="patientInformation.dateOfBirth"
						placement="top"
						fullWidth
					/>
				</Grid>

				{!isXSScreen && (
					<Grid item xs={12} sx={{ paddingTop: "0 !important" }}>
						<AppErrorMessage
							errors={formState.errors}
							name="patientInformation.gender"
							id="gender-error"
						/>

						<AppErrorMessage
							errors={formState.errors}
							name="patientInformation.dateOfBirth"
							id="dateOfBirth-error"
						/>
					</Grid>
				)}

				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="address"
						name="patientInformation.address"
						label="Address"
						errors={formState.errors}
						showErrorMessage={isXSScreen ? true : false}
						register={register}
						fullWidth
						inputProps={{ autoComplete: "given-name" }}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="phoneNumber"
						name="patientInformation.phoneNumber"
						label="Phone number"
						errors={formState.errors}
						showErrorMessage={isXSScreen ? true : false}
						register={register}
						fullWidth
						inputProps={{ autoComplete: "given-name" }}
					/>
				</Grid>

				{!isXSScreen && (
					<Grid item xs={12} sx={{ paddingTop: "0 !important" }}>
						<AppErrorMessage
							errors={formState.errors}
							name="patientInformation.address"
							id="address-error"
						/>

						<AppErrorMessage
							errors={formState.errors}
							name="patientInformation.phoneNumber"
							id="phoneNumber-error"
						/>
					</Grid>
				)}
			</Grid>
		</MedicalRecordSection>
	);
};
