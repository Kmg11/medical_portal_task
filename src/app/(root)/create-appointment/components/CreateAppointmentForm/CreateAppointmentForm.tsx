"use client";
import {
	AppDateTimePickerInput,
	AppSelectDropdown,
	AppSubmitButton,
} from "@/shared";
import React from "react";
import { useCreateAppointmentForm } from "./useCreateAppointmentForm";
import { doctorsList } from "./doctorsList";

export const CreateAppointmentForm = () => {
	const { control, errors, onSubmit, register } = useCreateAppointmentForm();

	return (
		<form
			onSubmit={onSubmit}
			autoComplete="off"
			style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
		>
			<AppSelectDropdown
				id="doctorId"
				name="doctorId"
				label="Doctor"
				control={control}
				items={doctorsList.map((doctor) => ({
					label: doctor.label,
					value: `${doctor.id}`,
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

			<AppSubmitButton loading={false} buttonProps={{ fullWidth: true }}>
				Create
			</AppSubmitButton>
		</form>
	);
};
