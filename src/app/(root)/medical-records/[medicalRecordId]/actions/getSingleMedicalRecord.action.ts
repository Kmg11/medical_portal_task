"use server";

import medicalRecordsJson from "@/data/medicalRecords.json";
import { IUser, getUsersMapped } from "@/shared";
import { IMedicalRecordPopulated, MedicalRecordsDataFile } from "../../types";
import { redirect } from "next/navigation";

const medicalRecordsData = medicalRecordsJson as MedicalRecordsDataFile;

export const getSingleMedicalRecordAction = async (
	medicalRecordId: IUser["id"]
) => {
	try {
		const medicalRecord = medicalRecordsData.medicalRecords.find(
			(medicalRecord) => medicalRecord.id === medicalRecordId
		);

		if (!medicalRecord) redirect("/");

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
