"use server";

import usersJson from "@/data/users.json";
import medicalRecordsJson from "@/data/medicalRecords.json";
import { IUser, UsersDataFile } from "@/shared";
import { MedicalRecordsDataFile } from "../types";

const usersData = usersJson as UsersDataFile;
const medicalRecordsData = medicalRecordsJson as MedicalRecordsDataFile;

export const getPatientWithMedicalRecordsAction = async (
	patientId: IUser["id"]
) => {
	try {
		const patient = usersData.users.find((user) => user.id === patientId);

		const medicalRecord = medicalRecordsData.medicalRecords.find(
			(medicalRecord) => medicalRecord.patientId === patientId
		);

		const patientPopulated: IUser = {
			...(patient as IUser),
			medicalRecord: medicalRecord,
		};

		return patientPopulated;
	} catch (error) {
		throw error;
	}
};
