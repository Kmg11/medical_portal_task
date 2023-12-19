"use server";

import medicalRecordsJson from "@/data/medicalRecords.json";
import { IUser, getUsersMapped } from "@/shared";
import { IMedicalRecordPopulated, MedicalRecordsDataFile } from "../../types";

const medicalRecordsData = medicalRecordsJson as MedicalRecordsDataFile;

export const getSingleMedicalRecordAction = async (
	medicalRecordId: IUser["id"]
) => {
	try {
		const medicalRecord = medicalRecordsData.medicalRecords.find(
			(medicalRecord) => medicalRecord.id === medicalRecordId
		);

		if (!medicalRecord) throw new Error("Medical record not found");

		const usersMap = getUsersMapped();
		const medicalRecordPopulated: IMedicalRecordPopulated = {
			...medicalRecord,
			patient: usersMap[medicalRecord.patientId],
		};

		return medicalRecordPopulated;
	} catch (error) {
		throw error;
	}
};
