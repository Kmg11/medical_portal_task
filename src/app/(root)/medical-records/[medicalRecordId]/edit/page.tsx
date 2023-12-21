import {
	AppSectionHeader,
	IUser,
	authConfig,
	checkPermissionAction,
} from "@/shared";
import React from "react";
import { CreateOrEditMedicalRecordForm } from "../../components";
import { getPatientWithMedicalRecordsAction } from "../../actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface EditMedicalRecordProps {
	params: { medicalRecordId: IUser["_id"] };
}

export default async function EditMedicalRecord({
	params,
}: EditMedicalRecordProps) {
	const session = await getServerSession(authConfig);
	if (!session) redirect("/auth/signin");

	await checkPermissionAction("patient");

	// * Check if the user owns the medical record
	if (session?.user.medicalRecordId !== params.medicalRecordId) {
		redirect("/");
	}

	const patient = await getPatientWithMedicalRecordsAction(session?.user._id);

	return (
		<main>
			<AppSectionHeader title="Edit Medical Record" />
			<CreateOrEditMedicalRecordForm patient={patient} />
		</main>
	);
}
