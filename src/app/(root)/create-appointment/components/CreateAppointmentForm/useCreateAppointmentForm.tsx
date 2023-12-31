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
		doctorId: "",
		dateTime: new Date().toISOString(),
	};

	const {
		handleSubmit,
		setFocus,
		control,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<CreateAppointmentFormValuesType>({
		defaultValues,
		resolver: yupResolver(createAppointmentSchema),
	});

	useEffect(() => {
		if (doctors?.length) setValue("doctorId", doctors[0]._id);
	}, [doctors, setValue]);

	useEffect(() => {
		setFocus("doctorId");
	}, [setFocus]);

	const onSubmit = handleSubmit(async (data) => {
		if (!session?.user?._id) return;

		await createAppointmentAction({
			dateTime: data.dateTime,
			doctorId: data.doctorId,
			patientId: session?.user?._id,
		});

		router.push("/");
	});

	return {
		onSubmit,
		errors,
		control,
		isSubmitting,
	};
};
