"use server";

import {
	IUser,
	MedicalRecordModel,
	UserModel,
	connectToDB,
	sendEmailAction,
} from "@/shared";
import { IMedicalRecord } from "../types";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";

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
	patientId: IUser["_id"];
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
		await connectToDB();

		// * Check if the patient exists
		const patient = await UserModel.findById(patientId).lean<IUser>();
		if (!patient) throw new Error("Patient not found");

		let updatedMedicalRecord: IMedicalRecord;

		const medicalRecord = await MedicalRecordModel.findOne({
			patientId,
		}).lean<IMedicalRecord>();

		// * If the patient has a medical record, update it
		if (patient.medicalRecordId !== null && medicalRecord) {
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
			updatedMedicalRecord._id
		);

		if (!updatedPatient) throw new Error("Patient not found");

		// * Send email to all doctors
		await sendEmailToAllDoctors(
			updatedPatient,
			updatedMedicalRecord,
			medicalRecord ? "update" : "create"
		);

		revalidatePath(`/medical-records/${updatedMedicalRecord._id}`);

		return updatedPatient;
	} catch (error) {
		throw error;
	}
};

const updatePatientInformation = async (
	patientId: IUser["_id"],
	patientInformation: CreateOrEditMedicalRecordActionParams["patientInformation"],
	medicalRecordId: IMedicalRecord["_id"]
) => {
	const updatedUser = await UserModel.findOneAndUpdate(
		{ _id: patientId },
		{ ...patientInformation, medicalRecordId },
		{ new: true }
	).lean<IUser>();

	return updatedUser;
};

const updateMedicalRecord = async (
	patientId: IUser["_id"],
	medicalRecord: IMedicalRecord,
	vitalSigns: VitalSignsType
) => {
	const updatedMedicalRecord = await MedicalRecordModel.findOneAndUpdate(
		{ patientId },
		{ ...medicalRecord, ...vitalSigns },
		{ new: true }
	).lean<IMedicalRecord>();

	return updatedMedicalRecord as IMedicalRecord;
};

const createMedicalRecord = async (
	patientId: IUser["_id"],
	vitalSigns: VitalSignsType
) => {
	const createdMedicalRecord = await MedicalRecordModel.create({
		patientId,
		patient: patientId,
		...vitalSigns,
	});

	return createdMedicalRecord;
};

const sendEmailToAllDoctors = async (
	patient: IUser,
	medicalRecord: IMedicalRecord,
	action: "create" | "update"
) => {
	const doctors = await UserModel.find({ role: "doctor" }).lean<IUser[]>();
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
