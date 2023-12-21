"use server";

import { IUser, MedicalRecordModel, connectToDB } from "@/shared";
import { IMedicalRecordPopulated } from "../../types";

export const getSingleMedicalRecordAction = async (
	medicalRecordId: IUser["_id"]
) => {
	try {
		await connectToDB();

		const medicalRecord = await MedicalRecordModel.findById(
			medicalRecordId
		).populate<IMedicalRecordPopulated>("patient");

		return medicalRecord as IMedicalRecordPopulated;
	} catch (error) {
		throw error;
	}
};
