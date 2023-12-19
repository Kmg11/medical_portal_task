import {
	IUser,
	belongToUserPermissionAction,
	checkPermissionAction,
} from "@/shared";
import React from "react";
import { getSingleMedicalRecordAction } from "./action";
import { redirect } from "next/navigation";

interface SingleMedicalRecordProps {
	params: { medicalRecordId: IUser["id"] };
}

export default async function SingleMedicalRecord({
	params,
}: SingleMedicalRecordProps) {
	try {
		await checkPermissionAction("doctor");
	} catch (e) {
		await belongToUserPermissionAction(params.medicalRecordId);
	}

	const medicalRecord = await getSingleMedicalRecordAction(
		params.medicalRecordId
	);

	return <div>Medical Record</div>;
}
