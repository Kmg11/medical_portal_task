import * as yup from "yup";

export const createOrEditMedicalRecordSchema = yup.object().shape({
	patientInformation: yup.object().shape({
		firstName: yup
			.string()
			.trim()
			.min(2, "First name must be at least 2 chars")
			.max(25, "First name must be at most 25 chars")
			.matches(/^[a-zA-Z]+$/, "First name must only contain letters")
			.required("First name is required"),

		lastName: yup
			.string()
			.trim()
			.min(2, "Last name must be at least 2 chars")
			.max(25, "Last name must be at most 25 chars")
			.matches(/^[a-zA-Z]+$/, "Last name is required")
			.required("Last name is required"),

		phoneNumber: yup.string().trim().optional(),
		address: yup.string().trim().optional(),
		gender: yup.string().oneOf(["male", "female"]).optional(),
		dateOfBirth: yup.string().required("Date of birth is required").optional(),
	}),

	vitalSigns: yup.object().shape({
		height: yup.number(),
		weight: yup.number(),

		temperature: yup
			.number()
			.min(30, "Temperature must be at least 30")
			.max(50, "Temperature must be at most 50"),

		bloodPressure: yup
			.string()
			.trim()
			.matches(
				/^[0-9]+\/[0-9]+$/,
				"Blood pressure must be in the format of 120/80"
			)
			.optional(),

		heartRate: yup.number(),
		respiratoryRate: yup.number(),
	}),
});

export type CreateOrEditMedicalRecordSchemaType = yup.InferType<
	typeof createOrEditMedicalRecordSchema
>;
