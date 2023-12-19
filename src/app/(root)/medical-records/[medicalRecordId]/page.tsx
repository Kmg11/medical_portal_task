import {
	AppNextMUILink,
	AppSectionHeader,
	IUser,
	authConfig,
	belongToUserPermissionAction,
	checkPermissionAction,
} from "@/shared";
import React from "react";
import { getSingleMedicalRecordAction } from "./actions";
import { redirect } from "next/navigation";
import { Grid } from "@mui/material";
import {
	MedicalRecordSection,
	MedicalRecordSectionHeader,
} from "../components";
import { getServerSession } from "next-auth";
import { PatientInformationView } from "./components";
import { VitalSignsView } from "./components/VitalSignsView/VitalSignsView";

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

	const session = await getServerSession(authConfig);
	const medicalRecord = await getSingleMedicalRecordAction(
		params.medicalRecordId
	);

	return (
		<main>
			<AppSectionHeader
				title="Medical Record"
				button={
					session?.user?.role === "patient" && (
						<AppNextMUILink
							href={`/medical-records/${params.medicalRecordId}/edit`}
						>
							Edit
						</AppNextMUILink>
					)
				}
			/>

			<Grid container spacing={3}>
				<MedicalRecordSection>
					<MedicalRecordSectionHeader>
						Patient Information
					</MedicalRecordSectionHeader>

					<PatientInformationView patient={medicalRecord.patient} />
				</MedicalRecordSection>

				<MedicalRecordSection>
					<MedicalRecordSectionHeader>Vital Signs</MedicalRecordSectionHeader>

					<VitalSignsView medicalRecord={medicalRecord} />
				</MedicalRecordSection>
			</Grid>
		</main>
	);
}
