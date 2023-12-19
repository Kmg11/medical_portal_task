"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createOrEditMedicalRecordSchema } from "./createOrEditMedicalRecord.schema";
import { subYears } from "date-fns";
import { IUser } from "@/shared";
import { createOrEditMedicalRecordAction } from "../../actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useCreateOrEditMedicalRecordForm = (patient: IUser) => {
	const { data: session, update } = useSession();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			patientInformation: {
				firstName: patient.firstName,
				lastName: patient.lastName,
				gender: patient?.gender || "male",
				dateOfBirth: patient.dateOfBirth
					? new Date(patient.dateOfBirth).toISOString()
					: subYears(new Date(), 18).toISOString(),
				address: patient?.address || "",
				phoneNumber: patient?.phoneNumber || "",
			},
			vitalSigns: {
				height: patient?.medicalRecord?.height || 0,
				weight: patient?.medicalRecord?.weight || 0,
				bloodPressure: patient?.medicalRecord?.bloodPressure || "120/80",
				temperature: patient?.medicalRecord?.temperature || 37,
				heartRate: patient?.medicalRecord?.heartRate || 0,
				respiratoryRate: patient?.medicalRecord?.respiratoryRate || 0,
			},
		},
		resolver: yupResolver(createOrEditMedicalRecordSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		if (!session?.user.id) return;

		const updatedPatient = await createOrEditMedicalRecordAction({
			patientId: session?.user.id,
			patientInformation: data.patientInformation,
			vitalSigns: data.vitalSigns,
		});

		router.push(`/medical-records/${updatedPatient?.medicalRecordId}`);

		await update({ user: updatedPatient });
	});

	return { onSubmit, form };
};
