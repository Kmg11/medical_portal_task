import { Box } from "@mui/material";
import React from "react";
import { MedicalRecordCard } from "./MedicalRecordCard/MedicalRecordCard";
import { AppNoDataMessage, IUser } from "@/shared";
import { IMedicalRecord } from "../../types";

const medicalRecords: IMedicalRecord[] = [
	{
		id: "1",
		patient: {
			id: "1",
			firstName: "John",
			lastName: "Doe",
			email: "john@gmail.com",
			role: "patient",
		},
		createdAt: "2021-10-01T00:00:00.000Z",
		updatedAt: "2021-10-01T00:00:00.000Z",
	},
	{
		id: "2",
		patient: {
			id: "1",
			firstName: "John",
			lastName: "Doe",
			email: "john@gmail.com",
			role: "patient",
		},
		createdAt: "2021-10-01T00:00:00.000Z",
		updatedAt: "2021-10-01T00:00:00.000Z",
	},
];

export const MedicalRecordsList = () => {
	return (
		<Box
			component="section"
			sx={{ display: "flex", gap: 2, flexDirection: "column" }}
		>
			{medicalRecords.map((medicalRecord) => (
				<MedicalRecordCard
					key={medicalRecord.id}
					medicalRecord={medicalRecord}
				/>
			))}

			{medicalRecords.length === 0 && (
				<AppNoDataMessage>No medical records found</AppNoDataMessage>
			)}
		</Box>
	);
};
