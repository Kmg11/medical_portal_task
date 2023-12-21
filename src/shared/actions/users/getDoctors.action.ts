"use server";

import { IUser, UserModel, connectToDB } from "@/shared";

export const getDoctorsAction = async () => {
	await connectToDB();

	const doctors = await UserModel.find(
		{ role: "doctor" },
		{ password: 0 }
	).lean<Omit<IUser, "password">[]>();

	return doctors;
};
