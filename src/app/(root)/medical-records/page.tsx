import React from "react";
import { AppSectionHeader, checkPermissionAction } from "@/shared";
import { MedicalRecordsList } from "./components";
import { getMedicalRecordsAction } from "./actions";

export default async function MedicalRecords() {
	await checkPermissionAction("doctor");

	const medicalRecords = await getMedicalRecordsAction();

	return (
		<main>
			<AppSectionHeader title="Medical Records" />
			<MedicalRecordsList medicalRecords={medicalRecords} />
		</main>
	);
}
