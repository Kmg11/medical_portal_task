import { Box } from "@mui/material";
import React from "react";
import { AppointmentCard } from "./AppointmentCard/AppointmentCard";
import { IAppointment, IAppointmentPopulated } from "@/shared";

interface AppointmentsListProps {
	appointments: IAppointmentPopulated[];
}

export const AppointmentsList = ({ appointments }: AppointmentsListProps) => {
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
