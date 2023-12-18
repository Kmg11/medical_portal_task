import { IUser } from ".";

export interface IAppointment {
	id: string;
	doctorId: string;
	patientId: string;
	dateTime: string;
	status: "pending" | "approved" | "rejected";
}

export interface IAppointmentPopulated extends IAppointment {
	doctor: IUser;
	patient: IUser;
}
