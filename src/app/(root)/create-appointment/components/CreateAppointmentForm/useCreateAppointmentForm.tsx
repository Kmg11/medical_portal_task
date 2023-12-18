"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createAppointmentSchema } from "./createAppointment.schema";
import { useRouter } from "next/navigation";
import { createAppointmentAction } from "../../actions";
import { useSession } from "next-auth/react";
import { useDoctorsContext } from "@/app/providers";

export type CreateAppointmentFormValuesType = {
	doctorId: string;
	dateTime: string;
};

export const useCreateAppointmentForm = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const { doctors } = useDoctorsContext();

	const defaultValues: CreateAppointmentFormValuesType = {
		doctorId: doctors[0]?.id,
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
