import { Box } from "@mui/material";
import React from "react";
import { AppointmentCard } from "./AppointmentCard/AppointmentCard";
import { IAppointment } from "@/shared";

const appointments: IAppointment[] = [
	{
		id: 1,
		doctor: "Dr. John Doe",
		patient: "Jane Doe",
		date: "2021-10-10",
		time: "10:00",
		status: "pending",
	},
	{
		id: 2,
		doctor: "Dr. John Doe",
		patient: "Jane Doe",
		date: "2021-10-10",
		time: "10:00",
		status: "approved",
	},
	{
		id: 3,
		doctor: "Dr. John Doe",
		patient: "Jane Doe",
		date: "2021-10-10",
		time: "10:00",
		status: "rejected",
	},
];

export const AppointmentsList = () => {
	return (
		<Box
			component="section"
			sx={{ display: "flex", gap: 4, flexDirection: "column" }}
		>
			{appointments.map((appointment) => (
				<AppointmentCard key={appointment.id} appointment={appointment} />
			))}

			{appointments.length === 0 && (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				>
					No appointments found
				</Box>
			)}
		</Box>
	);
};
