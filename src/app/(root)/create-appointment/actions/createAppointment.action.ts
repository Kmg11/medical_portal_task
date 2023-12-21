"use server";

import {
	AppointmentModel,
	IAppointment,
	IAppointmentPopulated,
	IUser,
	connectToDB,
	sendEmailAction,
} from "@/shared";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const createAppointmentAction = async (
	appointment: Pick<IAppointment, "doctorId" | "dateTime" | "patientId">
) => {
	try {
		await connectToDB();

		const createdAppointment = await AppointmentModel.create({
			doctorId: appointment.doctorId,
			patientId: appointment.patientId,
			doctor: appointment.doctorId,
			patient: appointment.patientId,
			dateTime: appointment.dateTime,
			status: "pending",
		});

		const appointmentPopulated: IAppointmentPopulated =
			await createdAppointment.populate("doctor patient");

		await sendAppointmentEmail(
			appointmentPopulated.patient,
			appointmentPopulated.doctor,
			createdAppointment
		);

		revalidatePath("/");
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
		email: [doctor?.email],
		firstName: doctor?.firstName || "",
		subject: "New appointment",
		message: message,
	});
}
