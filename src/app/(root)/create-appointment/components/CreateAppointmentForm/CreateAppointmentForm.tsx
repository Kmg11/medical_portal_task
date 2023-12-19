"use client";

import {
	AppDateTimePickerInput,
	AppSelectDropdown,
	AppSubmitButton,
} from "@/shared";
import React from "react";
import { useCreateAppointmentForm } from "./useCreateAppointmentForm";
import { useDoctorsContext } from "@/app/providers";

export const CreateAppointmentForm = () => {
	const { control, errors, onSubmit, isSubmitting } =
		useCreateAppointmentForm();
	const { doctors } = useDoctorsContext();

	return (
		<form
			onSubmit={onSubmit}
			autoComplete="off"
			style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
		>
			<AppSelectDropdown
				id="doctorId"
				name="doctorId"
				label="Doctor"
				control={control}
				items={doctors.map((doctor) => ({
					label: doctor.firstName + " " + doctor.lastName,
					value: doctor.id,
				}))}
				errors={errors}
				required
				fullWidth
			/>

			<AppDateTimePickerInput
				control={control}
				label={"Appointment Date & Time"}
				errors={errors}
				name="dateTime"
				minDate={new Date()}
				fullWidth
				required
			/>

			<AppSubmitButton loading={isSubmitting} buttonProps={{ fullWidth: true }}>
				Create
			</AppSubmitButton>
		</form>
	);
};
