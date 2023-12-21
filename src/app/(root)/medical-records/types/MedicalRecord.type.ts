import { IUser } from "@/shared";

export interface IMedicalRecord {
	_id: string;
	patientId: IUser["_id"];
	height?: number;
	weight?: number;
	bloodPressure?: string;
	temperature?: number;
	heartRate?: number;
	respiratoryRate?: number;
	createdAt: string;
	updatedAt: string;
}

export interface IMedicalRecordPopulated extends IMedicalRecord {
	patient: Omit<IUser, "password">;
}

export interface MedicalRecordsDataFile {
	index: number;
	medicalRecords: IMedicalRecord[];
}
