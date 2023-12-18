"use server";

import fs from "fs";
import {
	IAppointment,
	IUser,
	getDoctorAndPatient,
	sendEmailAction,
} from "@/shared";
import appointmentsData from "@/data/appointments.json";
import usersData from "@/data/users.json";
import { format } from "date-fns";

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

		const { doctor, patient } = getDoctorAndPatient(
			appointment.doctorId,
			appointment.patientId
		);

		if (doctor && patient) {
			await sendAppointmentEmail(patient, doctor, newAppointment);
		}
	} catch (error) {
		throw error;
	}
};

async function sendAppointmentEmail(
	patient: IUser,
	doctor: IUser,
	appointment: IAppointment
) {
	const patientFullName = `${patient?.firstName} ${patient?.lastName}`;
	const formatedDateTime = format(
		new Date(appointment.dateTime),
		"dd/MM/yyyy HH:mm"
	);

	const message = `You have a new appointment from ${patientFullName} on ${formatedDateTime}, please check your appointments page for more details.`;

	await sendEmailAction({
		email: doctor?.email || "",
		firstName: doctor?.firstName || "",
		subject: "New appointment",
		message: message,
	});
}
