"use client";
import { AppNextMUILink } from "@/shared";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

export const AppointmentsHeader = () => {
	const { data: session } = useSession();

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

			{session?.user.role === "patient" && (
				<Button variant="contained">
					<AppNextMUILink href="/create-appointment">
						New Appointment
					</AppNextMUILink>
				</Button>
			)}
		</Box>
	);
};
