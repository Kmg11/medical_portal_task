"use server";

import appointmentsData from "@/data/appointments.json";
import { IAppointment, IUser } from "@/shared";

export const getAppointmentsAction = async (
	userId: IUser["id"],
	role: IUser["role"]
) => {
	try {
		const appointments = appointmentsData.appointments.filter((appointment) => {
			if (role === "doctor") return appointment.doctorId === userId;
			if (role === "patient") return appointment.patientId === userId;
			return false;
		});

		return appointments as IAppointment[];
	} catch (error) {
		throw error;
	}
};
