import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
	{
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		patient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		height: { type: Number, required: false },
		weight: { type: Number, required: false },
		bloodPressure: { type: String, required: false },
		temperature: { type: Number, required: false },
		heartRate: { type: Number, required: false },
		respiratoryRate: { type: Number, required: false },
	},
	{ timestamps: true }
);

export const MedicalRecordModel =
	mongoose.models?.MedicalRecord ||
	mongoose.model("MedicalRecord", medicalRecordSchema);
