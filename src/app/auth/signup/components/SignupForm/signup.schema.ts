import * as yup from "yup";

export const signupSchema = yup.object().shape({
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

	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email is required"),

	password: yup
		.string()
		.min(6, "Password must be at least 6 characters long")
		.max(25, "Password must be no more than 25 characters long")
		.matches(
			/^(?=.*[a-z])/,
			"Password must contain at least one lowercase letter"
		)
		.matches(
			/^(?=.*[A-Z])/,
			"Password must contain at least one uppercase letter"
		)
		.matches(/^(?=.*\d)/, "Password must contain at least one number")
		.required("Password is required"),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords do not match")
		.required("Confirm password is required"),

	role: yup
		.string()
		.oneOf(["patient", "doctor"], "Role must be either patient or doctor")
		.required("Role is required"),
});
