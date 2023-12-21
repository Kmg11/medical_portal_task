import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: { type: String, required: true },
	role: { type: String, required: true, enum: ["patient", "doctor"] },
	gender: { type: String, enum: ["male", "female"] },
	dateOfBirth: { type: String },
	address: { type: String },
	phoneNumber: { type: String },
	medicalRecordId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "MedicalRecord",
	},
	medicalRecord: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "MedicalRecord",
	},
});

export const UserModel =
	mongoose.models?.User || mongoose.model("User", userSchema);
