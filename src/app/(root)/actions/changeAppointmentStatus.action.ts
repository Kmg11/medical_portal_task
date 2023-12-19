"use server";

import {
	AppointmentsDataFile,
	IAppointment,
	IUser,
	getDoctorAndPatient,
	sendEmailAction,
} from "@/shared";
import appointmentsJson from "@/data/appointments.json";
import fs from "fs";
import { format } from "date-fns";

const appointmentsData = appointmentsJson as AppointmentsDataFile;

export const changeAppointmentStatusAction = async (
	appointmentId: IAppointment["id"],
	appointmentStatus: IAppointment["status"]
) => {
	try {
		let selectedAppointment: IAppointment | undefined;
		const newAppointmentsData = appointmentsData.appointments.map(
			(appointment) => {
				if (appointment.id === appointmentId) {
					appointment.status = appointmentStatus;
					selectedAppointment = appointment as IAppointment;
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

		if (selectedAppointment) {
			const { doctor, patient } = getDoctorAndPatient(
				selectedAppointment.doctorId,
				selectedAppointment.patientId
			);

			if (doctor && patient) {
				await sendAppointmentUpdateEmail(patient, doctor, selectedAppointment);
			}
		}
	} catch (error) {
		throw error;
	}
};

async function sendAppointmentUpdateEmail(
	patient: IUser,
	doctor: IUser,
	appointment: IAppointment
) {
	const doctorFullName = `${doctor?.firstName} ${doctor?.lastName}`;
	const formatedDateTime = format(
		new Date(appointment.dateTime),
		"dd/MM/yyyy HH:mm"
	);

	const message = `Your appointment with Dr. ${doctorFullName} at ${formatedDateTime} has been ${appointment.status}.`;

	await sendEmailAction({
		email: patient?.email || "",
		firstName: patient?.firstName || "",
		subject: "Appointment Update",
		message: message,
	});
}
