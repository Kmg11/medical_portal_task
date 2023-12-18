"use server";

import usersData from "@/data/users.json";
import { IUser } from "@/shared";

export const getDoctorsAction = async () => {
	const doctors = usersData.users
		.filter((user) => user.role === "doctor")
		.map(({ password, ...doctor }) => doctor);

	return doctors as Omit<IUser, "password">[];
};
