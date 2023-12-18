import { IUser } from "@/shared";

export interface IMedicalRecord {
	id: string;
	patient: Omit<IUser, "password">;
	createdAt: string;
	updatedAt: string;
}
