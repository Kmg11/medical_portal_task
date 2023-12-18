"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./signup.schema";
import { IUser } from "@/shared";
import { signupAction } from "../../actions";
import { useRouter } from "next/navigation";

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
	const router = useRouter();

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
		await signupAction({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			role: data.role,
		});

		router.push("/auth/signin");
	});

	return {
		register,
		onSubmit,
		errors,
		control,
	};
};
