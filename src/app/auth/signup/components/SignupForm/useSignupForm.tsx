"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./signup.schema";
// import { useSignupMutation } from "../../../api";
import { IUser } from "@/shared";

export type SignupFormValues = Pick<
	IUser,
	"firstName" | "lastName" | "email" | "password" | "role"
> & {
	confirmPassword: string;
};

const defaultValues: SignupFormValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: "patient",
};

export const useSignupForm = () => {
	// const {
	// 	mutate: signup,
	// 	isLoading,
	// 	isError: isApiError,
	// 	error: apiError,
	// } = useSignupMutation();

	const {
		register,
		handleSubmit,
		setFocus,
		control,
		formState: { errors },
	} = useForm<SignupFormValues>({
		defaultValues,
		mode: "onTouched",
		resolver: yupResolver(signupSchema),
	});

	useEffect(() => {
		setFocus("firstName");
	}, [setFocus]);

	const onSubmit = handleSubmit(async (data) => {
		// signup({
		// 	body: {
		// 		firstName: data.firstName,
		// 		lastName: data.lastName,
		// 		email: data.email,
		// 		password: data.password,
		// 	},
		// });
	});

	return {
		register,
		onSubmit,
		errors,
		control,
		isLoading: false,
		isApiError: false,
		apiError: { message: "" },
	};
};
