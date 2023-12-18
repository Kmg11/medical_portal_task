export interface IAppointment {
	id: number;
	doctor: string;
	patient: string;
	date: string;
	time: string;
	status: "pending" | "approved" | "rejected";
}
