"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

export const CreateAppointmentHeader = () => {
	return (
		<Box
			component="header"
			sx={(theme) => ({
				display: "flex",
				alignItems: "center",
				gap: 4,
				justifyContent: "space-between",
				mb: 4,
				p: 2,
				backgroundColor: theme.palette.grey[900],
			})}
		>
			<Typography variant="h6" component="h1">
				Create Appointment
			</Typography>
		</Box>
	);
};
