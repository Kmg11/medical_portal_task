import { Box, Typography } from "@mui/material";
import React from "react";

interface MedicalRecordSectionHeaderProps {
	children: string;
}

export const MedicalRecordSectionHeader = ({
	children,
}: MedicalRecordSectionHeaderProps) => {
	return (
		<Typography variant="subtitle1" component="h3" fontWeight="600" mb={2}>
			{children}
		</Typography>
	);
};
