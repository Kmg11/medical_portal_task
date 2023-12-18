"use client";

import { changeAppointmentStatusAction } from "@/app/(root)/actions";
import { IAppointmentPopulated } from "@/shared";
import { Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

interface AppointmentCardProps {
	appointment: IAppointmentPopulated;
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
	const { data: session } = useSession();

	const fullDoctorName = `${appointment.doctor.firstName} ${appointment.doctor.lastName}`;
	const fullPatientName = `${appointment.patient.firstName} ${appointment.patient.lastName}`;

	const approveAppointment = async () => {
		await changeAppointmentStatusAction(appointment.id, "approved");
	};

	const rejectAppointment = async () => {
		await changeAppointmentStatusAction(appointment.id, "rejected");
	};

	return (
		<Box
			component="section"
			sx={(theme) => ({
				display: "flex",
				gap: 4,
				flexWrap: "wrap",
				justifyContent: "space-between",
				p: 2,
				borderRadius: theme.shape.borderRadius,
				border: `2px solid ${
					appointment.status === "pending"
						? theme.palette.primary.main
						: appointment.status === "approved"
						? theme.palette.success.main
						: theme.palette.error.main
				}`,
				backgroundColor: theme.palette.grey[900],
			})}
		>
			<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
				<Typography variant="body1" component="h3">
					Appointment for {fullPatientName} with Dr. {fullDoctorName} on{" "}
					{appointment.dateTime}
				</Typography>

				<Typography variant="body1" component="span">
					-
				</Typography>

				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<Typography variant="body1" component="h3">
						Status:
					</Typography>
					<Typography
						variant="body1"
						component="h3"
						sx={{
							textTransform: "capitalize",
							color:
								appointment.status === "pending"
									? "primary.main"
									: appointment.status === "approved"
									? "success.main"
									: "error.main",
						}}
					>
						{appointment.status}
					</Typography>
				</Box>
			</Box>

			{appointment.status === "pending" && session?.user.role === "doctor" && (
				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={approveAppointment}
					>
						Approve
					</Button>

					<Button
						variant="contained"
						color="error"
						size="small"
						onClick={rejectAppointment}
					>
						Reject
					</Button>
				</Box>
			)}
		</Box>
	);
};
