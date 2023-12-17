import * as yup from "yup";

export const signinSchema = yup.object().shape({
	email: yup
		.string()
		.email("Please type a valid email")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});
