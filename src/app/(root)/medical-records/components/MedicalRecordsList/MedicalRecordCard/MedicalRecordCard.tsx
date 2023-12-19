"use client";

import React from "react";
import { IMedicalRecordPopulated } from "../../../types";
import { Box, Typography } from "@mui/material";
import { AppNextMUILink } from "@/shared";
import { format } from "date-fns";

interface MedicalRecordCardProps {
	medicalRecord: IMedicalRecordPopulated;
}

export const MedicalRecordCard = ({
	medicalRecord,
}: MedicalRecordCardProps) => {
	return (
		<Box
			component="article"
			sx={(t) => ({
				borderRadius: t.shape.borderRadius,
				p: 2,
				backgroundColor: t.palette.grey[900],
			})}
		>
			<AppNextMUILink href={`/medical-records/${medicalRecord.id}`}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: {
							xs: "column",
							md: "row",
						},
						gap: 1,
					}}
				>
					<Typography variant="body1">
						{medicalRecord.patient.firstName} {medicalRecord.patient.lastName}
					</Typography>

					<Typography variant="body2">
						Created at:{" "}
						{format(new Date(medicalRecord.createdAt), "dd/MM/yyyy HH:mm")}
					</Typography>

					<Typography variant="body2">
						Last update:{" "}
						{format(new Date(medicalRecord.updatedAt), "dd/MM/yyyy HH:mm")}
					</Typography>
				</Box>
			</AppNextMUILink>
		</Box>
	);
};
