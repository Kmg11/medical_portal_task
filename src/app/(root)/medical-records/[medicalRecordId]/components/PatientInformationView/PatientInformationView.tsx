import { IUser } from "@/shared";
import { Box } from "@mui/material";
import React from "react";
import { KeyValueView } from "../KeyValueView/KeyValueView";
import { format } from "date-fns";

interface PatientInformationViewProps {
	patient: Omit<IUser, "password">;
}

export const PatientInformationView = ({
	patient,
}: PatientInformationViewProps) => {
	return (
		<Box display="flex" gap={2} flexDirection="column">
			<KeyValueView label="First name" value={patient.firstName} />
			<KeyValueView label="Last name" value={patient.lastName} />
			<KeyValueView label="Email" value={patient.email} />

			{patient.gender && <KeyValueView label="Gender" value={patient.gender} />}

			{patient.phoneNumber && (
				<KeyValueView label="Phone Number" value={patient.phoneNumber} />
			)}

			{patient.address && (
				<KeyValueView label="Address" value={patient.address} />
			)}

			{patient.dateOfBirth && (
				<KeyValueView
					label="Date of Birth"
					value={format(new Date(patient.dateOfBirth), "dd/MM/yyyy")}
				/>
			)}
		</Box>
	);
};
