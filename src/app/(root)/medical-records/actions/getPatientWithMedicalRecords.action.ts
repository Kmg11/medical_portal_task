"use server";

import { IUser, UserModel, connectToDB } from "@/shared";

export const getPatientWithMedicalRecordsAction = async (
	patientId: IUser["_id"]
) => {
	try {
		await connectToDB();

		const patient = await UserModel.findById(patientId).populate(
			"medicalRecord"
		);

		return patient;
	} catch (error) {
		throw error;
	}
};
