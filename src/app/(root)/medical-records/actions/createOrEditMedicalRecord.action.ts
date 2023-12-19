"use server";

import usersJson from "@/data/users.json";
import medicalRecordsJson from "@/data/medicalRecords.json";
import { IUser, UsersDataFile, sendEmailAction } from "@/shared";
import { IMedicalRecord, MedicalRecordsDataFile } from "../types";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";

const usersData = usersJson as UsersDataFile;
const medicalRecordsData = medicalRecordsJson as MedicalRecordsDataFile;

interface VitalSignsType
	extends Pick<
		IMedicalRecord,
		| "height"
		| "weight"
		| "bloodPressure"
		| "heartRate"
		| "respiratoryRate"
		| "temperature"
	> {}

interface CreateOrEditMedicalRecordActionParams {
	patientId: IUser["id"];
	patientInformation: Pick<
		IUser,
		| "firstName"
		| "lastName"
		| "gender"
		| "dateOfBirth"
		| "address"
		| "phoneNumber"
	>;
	vitalSigns: VitalSignsType;
}

export const createOrEditMedicalRecordAction = async ({
	patientId,
	patientInformation,
	vitalSigns,
}: CreateOrEditMedicalRecordActionParams) => {
	try {
		// * Check if the patient exists
		const patient = usersData.users.find((user) => user.id === patientId);
		if (!patient) throw new Error("Patient not found");

		// * Check if the patient has a medical record
		const medicalRecord = medicalRecordsData.medicalRecords.find(
			(medicalRecord) => medicalRecord.patientId === patientId
		);

		let updatedMedicalRecord: IMedicalRecord;

		// * If the patient has a medical record, update it
		if (medicalRecord) {
			updatedMedicalRecord = await updateMedicalRecord(
				patientId,
				medicalRecord,
				vitalSigns
			);
		} else {
			// * If the patient doesn't have a medical record, create one
			updatedMedicalRecord = await createMedicalRecord(patientId, vitalSigns);
		}

		// * Update patient information
		const updatedPatient = await updatePatientInformation(
			patientId,
			patientInformation,
			updatedMedicalRecord.id
		);

		if (!updatedPatient) throw new Error("Patient not found");

		// * Send email to all doctors
		await sendEmailToAllDoctors(
			updatedPatient,
			updatedMedicalRecord,
			medicalRecord ? "update" : "create"
		);

		revalidatePath(`/medical-records/${updatedMedicalRecord.id}`);

		return updatedPatient;
	} catch (error) {
		throw error;
	}
};

const updatePatientInformation = async (
	patientId: IUser["id"],
	patientInformation: CreateOrEditMedicalRecordActionParams["patientInformation"],
	medicalRecordId: IMedicalRecord["id"]
) => {
	const newUsersData = usersData.users.map((user) =>
		user.id === patientId
			? { ...user, ...patientInformation, medicalRecordId }
			: user
	);

	await fs.promises.writeFile(
		"./src/data/users.json",
		JSON.stringify({ index: usersData.index, users: newUsersData }),
		"utf8"
	);

	return newUsersData.find((user) => user.id === patientId);
};

const updateMedicalRecord = async (
	patientId: IUser["id"],
	medicalRecord: IMedicalRecord,
	vitalSigns: VitalSignsType
) => {
	const updatedMedicalRecord: IMedicalRecord = {
		...medicalRecord,
		...vitalSigns,
		updatedAt: new Date().toISOString(),
	};

	const newMedicalRecordsData = medicalRecordsData.medicalRecords.map(
		(medicalRecord) =>
			medicalRecord.patientId === patientId
				? updatedMedicalRecord
				: medicalRecord
	);

	await fs.promises.writeFile(
		"./src/data/medicalRecords.json",
		JSON.stringify({
			medicalRecords: newMedicalRecordsData,
			index: medicalRecordsData.index,
		}),
		"utf8"
	);

	return updatedMedicalRecord;
};

const createMedicalRecord = async (
	patientId: IUser["id"],
	vitalSigns: VitalSignsType
) => {
	const newMedicalRecord: IMedicalRecord = {
		id: `${medicalRecordsData.index}`,
		patientId,
		...vitalSigns,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	const newMedicalRecordsData = {
		index: medicalRecordsData.index + 1,
		medicalRecords: [...medicalRecordsData.medicalRecords, newMedicalRecord],
	};

	await fs.promises.writeFile(
		"./src/data/medicalRecords.json",
		JSON.stringify(newMedicalRecordsData),
		"utf8"
	);

	return newMedicalRecord;
};

const sendEmailToAllDoctors = async (
	patient: IUser,
	medicalRecord: IMedicalRecord,
	action: "create" | "update"
) => {
	const doctors = usersData.users.filter((user) => user.role === "doctor");
	const emails = doctors.map((doctor) => doctor.email);

	const patientFullName = `${patient?.firstName} ${patient?.lastName}`;
	const formatedDateTime = format(
		new Date(medicalRecord.updatedAt),
		"dd/MM/yyyy HH:mm"
	);

	const createdMessage = `${patientFullName} created his/her medical record on ${formatedDateTime}, please check your medical records page for more details.`;

	const updatedMessage = `${patientFullName} updated his/her medical record on ${formatedDateTime}, please check your medical records page for more details.`;

	await sendEmailAction({
		email: emails,
		firstName: "Doctors",
		subject:
			action === "create" ? "New Medical Record" : "Medical Record Updated",
		message: action === "create" ? createdMessage : updatedMessage,
	});
};
