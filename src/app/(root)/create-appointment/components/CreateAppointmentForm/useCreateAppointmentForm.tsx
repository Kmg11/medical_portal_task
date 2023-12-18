"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createAppointmentSchema } from "./createAppointment.schema";
import { useRouter } from "next/navigation";
import { doctorsList } from "./doctorsList";
import { createAppointmentAction } from "../../actions";
import { useSession } from "next-auth/react";

export type CreateAppointmentFormValuesType = {
	doctorId: string;
	dateTime: string;
};

export const useCreateAppointmentForm = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const defaultValues: CreateAppointmentFormValuesType = {
		doctorId: doctorsList[0].id,
		dateTime: new Date().toISOString(),
	};

	const {
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
		if (!session?.user?.id) return;

		await createAppointmentAction({
			dateTime: data.dateTime,
			doctorId: data.doctorId,
			patientId: session?.user?.id,
		});

		router.push("/");
	});

	return {
		onSubmit,
		errors,
		control,
	};
};
