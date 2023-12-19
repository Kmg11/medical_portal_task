import React from "react";
import { IMedicalRecordPopulated } from "../../../types";
import { Box } from "@mui/material";
import { KeyValueView } from "../KeyValueView/KeyValueView";

interface VitalSignsViewProps {
	medicalRecord: IMedicalRecordPopulated;
}

export const VitalSignsView = ({ medicalRecord }: VitalSignsViewProps) => {
	const {
		bloodPressure,
		weight,
		heartRate,
		height,
		respiratoryRate,
		temperature,
	} = medicalRecord;

	return (
		<Box display="flex" gap={2} flexDirection="column">
			{height && <KeyValueView label="Height" value={height} />}

			{weight && <KeyValueView label="Weight" value={weight} />}

			{bloodPressure && (
				<KeyValueView label="Blood Pressure" value={bloodPressure} />
			)}

			{heartRate && <KeyValueView label="Heart Rate" value={heartRate} />}

			{respiratoryRate && (
				<KeyValueView label="Respiratory Rate" value={respiratoryRate} />
			)}

			{temperature && <KeyValueView label="Temperature" value={temperature} />}

			{height === 0 &&
				weight === 0 &&
				!bloodPressure &&
				heartRate === 0 &&
				respiratoryRate === 0 &&
				temperature === 0 && <KeyValueView label="No vital signs" value="" />}
		</Box>
	);
};
