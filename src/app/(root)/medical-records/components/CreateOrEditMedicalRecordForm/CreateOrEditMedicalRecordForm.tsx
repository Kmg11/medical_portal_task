"use client";

import React from "react";
import { useCreateOrEditMedicalRecordForm } from "./useCreateOrEditMedicalRecordForm";
import { FormProvider } from "react-hook-form";
import { AppSubmitButton, IUser } from "@/shared";
import { PatientInformation } from "./PatientInformation/PatientInformation";
import { VitalSigns } from "./VitalSigns/VitalSigns";
import { Grid } from "@mui/material";

interface CreateOrEditMedicalRecordFormProps {
	patient: IUser;
}

export const CreateOrEditMedicalRecordForm = ({
	patient,
}: CreateOrEditMedicalRecordFormProps) => {
	const { form, onSubmit } = useCreateOrEditMedicalRecordForm(patient);

	return (
		<FormProvider {...form}>
			<form onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<PatientInformation />

					<VitalSigns />

					<Grid item xs={12}>
						<AppSubmitButton loading={form.formState.isSubmitting}>
							Save
						</AppSubmitButton>
					</Grid>
				</Grid>
			</form>
		</FormProvider>
	);
};
