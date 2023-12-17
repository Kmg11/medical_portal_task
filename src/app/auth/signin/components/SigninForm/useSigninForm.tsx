"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signinSchema } from "./signin.schema";
import { useRouter } from "next/navigation";
import { signIn as nextAuthSignin } from "next-auth/react";

export type SigninFormValuesType = {
	email: string;
	password: string;
};

export const useSigninForm = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState(false);

	const defaultValues: SigninFormValuesType = { email: "", password: "" };

	const {
		register,
		handleSubmit,
		setFocus,
		formState: { errors },
	} = useForm<SigninFormValuesType>({
		defaultValues,
		mode: "onTouched",
		resolver: yupResolver(signinSchema),
	});

	useEffect(() => {
		setFocus("email");
	}, [setFocus]);

	const onSubmit = handleSubmit(async (data) => {
		setIsLoading(true);

		const res = await nextAuthSignin("credentials", {
			redirect: false,
			email: data.email,
			password: data.password,
			callbackUrl: "/",
		});

		if (res?.ok) {
			setIsLoading(false);
			router.replace("/");
		}

		if (res?.error) {
			setIsLoading(false);
			setApiError(true);
		}
	});

	return {
		register,
		onSubmit,
		errors,
		isLoading,
		apiError,
	};
};
