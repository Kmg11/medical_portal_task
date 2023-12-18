"use server";

import { IAppointment } from "@/shared";
import appointmentsData from "@/data/appointments.json";
import fs from "fs";

export const changeAppointmentStatusAction = async (
	appointmentId: IAppointment["id"],
	appointmentStatus: IAppointment["status"]
) => {
	try {
		const newAppointmentsData = appointmentsData.appointments.map(
			(appointment) => {
				if (appointment.id === appointmentId) {
					appointment.status = appointmentStatus;
				}
				return appointment;
			}
		);

		// * Update appointments.json
		await fs.promises.writeFile(
			"src/data/appointments.json",
			JSON.stringify({
				index: appointmentsData.index,
				appointments: newAppointmentsData,
			}),
			"utf8"
		);

		// TODO: Send notification to doctor
	} catch (error) {
		throw error;
	}
};
