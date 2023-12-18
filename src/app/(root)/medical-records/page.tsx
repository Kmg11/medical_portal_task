import React from "react";
import { AppSectionHeader, checkPermissionAction } from "@/shared";
import { MedicalRecordsList } from "./components";

export default async function MedicalRecords() {
	await checkPermissionAction("doctor");

	// TODO: get medical records

	return (
		<main>
			<AppSectionHeader title="Medical Records" />
			<MedicalRecordsList />
		</main>
	);
}
