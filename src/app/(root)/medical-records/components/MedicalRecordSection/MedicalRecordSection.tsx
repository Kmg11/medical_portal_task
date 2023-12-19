"use client";

import { Box, Grid } from "@mui/material";
import React from "react";

interface MedicalRecordSectionProps {
	children: React.ReactNode;
}

export const MedicalRecordSection = ({
	children,
}: MedicalRecordSectionProps) => {
	return (
		<Grid item xs={12}>
			<Box
				component="section"
				p={2}
				sx={(theme) => ({
					border: `1px solid ${theme.palette.divider}`,
					borderRadius: theme.shape.borderRadius,
				})}
			>
				{children}
			</Box>
		</Grid>
	);
};
