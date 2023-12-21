import { Box } from "@mui/material";
import React from "react";
import { MedicalRecordCard } from "./MedicalRecordCard/MedicalRecordCard";
import { AppNoDataMessage } from "@/shared";
import { IMedicalRecordPopulated } from "../../types";

interface MedicalRecordsListProps {
	medicalRecords: IMedicalRecordPopulated[];
}

export const MedicalRecordsList = ({
	medicalRecords,
}: MedicalRecordsListProps) => {
	return (
		<Box
			component="section"
			sx={{ display: "flex", gap: 2, flexDirection: "column" }}
		>
			{medicalRecords.map((medicalRecord) => (
				<MedicalRecordCard
					key={medicalRecord._id}
					medicalRecord={medicalRecord}
				/>
			))}

			{medicalRecords.length === 0 && (
				<AppNoDataMessage>No medical records found</AppNoDataMessage>
			)}
		</Box>
	);
};
