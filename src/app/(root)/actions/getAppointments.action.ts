"use server";

import appointmentsData from "@/data/appointments.json";
import usersData from "@/data/users.json";
import { IAppointmentPopulated, IUser } from "@/shared";

export const getAppointmentsAction = async (
	userId: IUser["id"],
	role: IUser["role"]
) => {
	try {
		const usersMap = usersData.users
			.map(({ password, ...user }) => {
				return user;
			})
			.reduce((acc, user) => {
				acc[user.id] = user as IUser;

				return acc;
			}, {} as Record<IUser["id"], IUser>);

		const appointments = appointmentsData.appointments
			.filter((appointment) => {
				if (role === "doctor") return appointment.doctorId === userId;
				if (role === "patient") return appointment.patientId === userId;
				return false;
			})
			.map((appointment) => {
				const populatedAppointment = appointment as IAppointmentPopulated;

				populatedAppointment.doctor = usersMap[appointment.doctorId];
				populatedAppointment.patient = usersMap[appointment.patientId];

				return populatedAppointment;
			});

		return appointments as IAppointmentPopulated[];
	} catch (error) {
		throw error;
	}
};
