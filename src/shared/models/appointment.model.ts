import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
	doctorId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	patientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	dateTime: { type: String, required: true },

	status: {
		type: String,
		enum: ["pending", "approved", "rejected"],
		default: "pending",
	},
});

export const AppointmentModel =
	mongoose.models?.Appointment ||
	mongoose.model("Appointment", appointmentSchema);
