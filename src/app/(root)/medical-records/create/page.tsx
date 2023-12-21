import { AppSectionHeader, authConfig, checkPermissionAction } from "@/shared";
import React from "react";
import { CreateOrEditMedicalRecordForm } from "../components";
import { getPatientWithMedicalRecordsAction } from "../actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CreateMedicalRecord() {
	await checkPermissionAction("patient");

	const session = await getServerSession(authConfig);
	if (!session) redirect("/auth/signin");

	const patient = await getPatientWithMedicalRecordsAction(session?.user._id);

	return (
		<main>
			<AppSectionHeader title="Create Medical Record" />
			<CreateOrEditMedicalRecordForm patient={patient} />
		</main>
	);
}
