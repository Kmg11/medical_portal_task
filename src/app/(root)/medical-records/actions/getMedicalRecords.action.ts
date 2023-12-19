"use server";

import medicalRecordsJson from "@/data/medicalRecords.json";
import { getUsersMapped } from "@/shared";
import { IMedicalRecordPopulated, MedicalRecordsDataFile } from "../types";

const medicalRecordsData = medicalRecordsJson as MedicalRecordsDataFile;

export const getMedicalRecordsAction = async () => {
	try {
		const usersMap = getUsersMapped();

		const medicalRecords = medicalRecordsData.medicalRecords.map(
			(medicalRecord) => {
				return {
					...medicalRecord,
					patient: usersMap[medicalRecord.patientId],
				} as IMedicalRecordPopulated;
			}
		);

		return medicalRecords;
	} catch (error) {
		throw error;
	}
};
