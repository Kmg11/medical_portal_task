"use server";

import {
	AppointmentModel,
	IAppointmentPopulated,
	IUser,
	connectToDB,
} from "@/shared";

export const getAppointmentsAction = async (
	userId: IUser["_id"],
	role: IUser["role"]
) => {
	try {
		await connectToDB();

		const appointments = AppointmentModel.find({});

		if (role === "doctor") appointments.where("doctorId").equals(userId);
		if (role === "patient") appointments.where("patientId").equals(userId);

		const appointmentsPopulated = await appointments
			.populate("doctor patient")
			.lean();

		return appointmentsPopulated as IAppointmentPopulated[];
	} catch (error) {
		throw error;
	}
};
