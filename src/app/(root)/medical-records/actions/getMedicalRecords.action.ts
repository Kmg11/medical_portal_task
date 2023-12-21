"use server";

import { MedicalRecordModel, connectToDB } from "@/shared";
import { IMedicalRecordPopulated } from "../types";

export const getMedicalRecordsAction = async () => {
	try {
		await connectToDB();

		const medicalRecords = await MedicalRecordModel.find()
			.populate("patient")
			.lean<IMedicalRecordPopulated[]>();

		return medicalRecords;
	} catch (error) {
		throw error;
	}
};
