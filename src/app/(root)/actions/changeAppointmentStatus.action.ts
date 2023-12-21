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

export const changeAppointmentStatusAction = async (
	appointmentId: IAppointment["_id"],
	appointmentStatus: IAppointment["status"]
) => {
	try {
		await connectToDB();

		const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
			appointmentId,
			{ status: appointmentStatus },
			{ new: true }
		);

		const updatedAppointmentPopulated: IAppointmentPopulated =
			await updatedAppointment.populate("doctor patient");

		await sendAppointmentUpdateEmail(
			updatedAppointmentPopulated.patient,
			updatedAppointmentPopulated.doctor,
			updatedAppointment
		);

		revalidatePath("/");
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
		email: [patient?.email],
		firstName: patient?.firstName || "",
		subject: "Appointment Update",
		message: message,
	});
}
