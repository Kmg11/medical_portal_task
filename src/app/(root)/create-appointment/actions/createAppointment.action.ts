"use server";

import fs from "fs";
import { IAppointment } from "@/shared";
import appointmentsData from "@/data/appointments.json";

export const createAppointmentAction = async (
	appointment: Pick<IAppointment, "doctorId" | "dateTime" | "patientId">
) => {
	try {
		const newAppointment: IAppointment = {
			id: `${appointmentsData.index}`,
			doctorId: appointment.doctorId,
			patientId: appointment.patientId,
			dateTime: appointment.dateTime,
			status: "pending",
		};

		const newAppointmentsData = {
			index: appointmentsData.index + 1,
			appointments: [...appointmentsData.appointments, newAppointment],
		};

		// * Update appointments.json
		await fs.promises.writeFile(
			"src/data/appointments.json",
			JSON.stringify(newAppointmentsData),
			"utf8"
		);

		// TODO: Send notification to doctor
	} catch (error) {
		throw error;
	}
};
