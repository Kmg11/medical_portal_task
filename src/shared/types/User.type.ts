import { IMedicalRecord } from "@/app/(root)/medical-records/types";

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: "patient" | "doctor";
	gender?: "male" | "female";
	dateOfBirth?: string;
	address?: string;
	phoneNumber?: string;
	medicalRecordId?: string;
	medicalRecord?: IMedicalRecord;
}

export interface UsersDataFile {
	index: number;
	users: IUser[];
}
