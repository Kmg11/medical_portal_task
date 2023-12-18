"use client";
import { AppNextMUILink } from "@/shared";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

export const AppointmentsHeader = () => {
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
				Appointments
			</Typography>

			{/* Patients Only */}
			<Button variant="contained">
				<AppNextMUILink href="/create-appointment">
					New Appointment
				</AppNextMUILink>
			</Button>
		</Box>
	);
};
