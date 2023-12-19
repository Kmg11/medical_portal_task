import {
	AppNextMUILink,
	AppSectionHeader,
	IUser,
	authConfig,
	checkPermissionAction,
} from "@/shared";
import React from "react";
import { getSingleMedicalRecordAction } from "./actions";
import { redirect } from "next/navigation";
import { Button, Grid } from "@mui/material";
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
	const session = await getServerSession(authConfig);

	try {
		await checkPermissionAction("doctor");
	} catch (e) {
		// * Check if the user owns the medical record
		if (session?.user.medicalRecordId !== params.medicalRecordId) {
			redirect("/");
		}
	}

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
							<Button variant="contained" size="small">
								Edit
							</Button>
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
