export interface IAppointment {
	id: string;
	doctorId: string;
	patientId: string;
	dateTime: string;
	status: "pending" | "approved" | "rejected";
}
