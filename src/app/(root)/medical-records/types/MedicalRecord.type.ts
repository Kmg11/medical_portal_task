import { IUser } from "@/shared";

export interface IMedicalRecord {
	id: string;
	patientId: IUser["id"];
	createdAt: string;
	updatedAt: string;
}

export interface IMedicalRecordPopulated extends IMedicalRecord {
	patient: Omit<IUser, "password">;
}
