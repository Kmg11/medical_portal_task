export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: "patient" | "doctor";
	medicalRecordId: string | null;
}
