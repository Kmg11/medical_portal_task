"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createAppointmentSchema } from "./createAppointment.schema";
import { useRouter } from "next/navigation";
import { doctorsList } from "./doctorsList";

export type CreateAppointmentFormValuesType = {
	doctorId: string;
	dateTime: string;
};

export const useCreateAppointmentForm = () => {
	const router = useRouter();

	const defaultValues: CreateAppointmentFormValuesType = {
		doctorId: doctorsList[0].id,
		dateTime: new Date().toISOString(),
	};

	const {
		register,
		handleSubmit,
		setFocus,
		control,
		formState: { errors },
	} = useForm<CreateAppointmentFormValuesType>({
		defaultValues,
		resolver: yupResolver(createAppointmentSchema),
	});

	useEffect(() => {
		setFocus("doctorId");
	}, [setFocus]);

	const onSubmit = handleSubmit(async (data) => {
		console.log(data);
		// router.push("/");
	});

	return {
		register,
		onSubmit,
		errors,
		control,
	};
};
