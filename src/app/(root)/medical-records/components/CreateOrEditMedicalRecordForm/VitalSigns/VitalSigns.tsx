"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { MedicalRecordSectionHeader } from "../../MedicalRecordSectionHeader/MedicalRecordSectionHeader";
import { MedicalRecordSection } from "../../MedicalRecordSection/MedicalRecordSection";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { AppErrorMessage, AppTextInput } from "@/shared";
import { CreateOrEditMedicalRecordSchemaType } from "../createOrEditMedicalRecord.schema";

export const VitalSigns = () => {
	const { register, control, formState } =
		useFormContext<CreateOrEditMedicalRecordSchemaType>();
	const { breakpoints } = useTheme();

	const isXSScreen = useMediaQuery(breakpoints.down("sm"));

	return (
		<MedicalRecordSection>
			<MedicalRecordSectionHeader>Vital Signs</MedicalRecordSectionHeader>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="height"
						name="vitalSigns.height"
						label="Height"
						errors={formState.errors}
						showErrorMessage={isXSScreen ? true : false}
						register={register}
						fullWidth
						inputProps={{ autoComplete: "given-name" }}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="weight"
						name="vitalSigns.weight"
						label="Weight"
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
							name="vitalSigns.height"
							id="height-error"
						/>

						<AppErrorMessage
							errors={formState.errors}
							name="vitalSigns.weight"
							id="weight-error"
						/>
					</Grid>
				)}

				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="bloodPressure"
						name="vitalSigns.bloodPressure"
						label="Blood Pressure"
						errors={formState.errors}
						showErrorMessage={isXSScreen ? true : false}
						register={register}
						fullWidth
						inputProps={{ autoComplete: "given-name" }}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="temperature"
						name="vitalSigns.temperature"
						label="Temperature"
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
							name="vitalSigns.bloodPressure"
							id="bloodPressure-error"
						/>

						<AppErrorMessage
							errors={formState.errors}
							name="vitalSigns.temperature"
							id="temperature-error"
						/>
					</Grid>
				)}

				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="heartRate"
						name="vitalSigns.heartRate"
						label="Heart Rate"
						errors={formState.errors}
						showErrorMessage={isXSScreen ? true : false}
						register={register}
						fullWidth
						inputProps={{ autoComplete: "given-name" }}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<AppTextInput
						id="respiratoryRate"
						name="vitalSigns.respiratoryRate"
						label="Respiratory Rate"
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
							name="vitalSigns.heartRate"
							id="heartRate-error"
						/>

						<AppErrorMessage
							errors={formState.errors}
							name="vitalSigns.respiratoryRate"
							id="respiratoryRate-error"
						/>
					</Grid>
				)}
			</Grid>
		</MedicalRecordSection>
	);
};
