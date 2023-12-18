import * as yup from "yup";

export const createAppointmentSchema = yup.object().shape({
	doctorId: yup.string().required("Doctor is required"),
	dateTime: yup.string().required("Date and time is required"),
});
