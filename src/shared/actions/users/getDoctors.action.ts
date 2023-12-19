"use server";

import usersJson from "@/data/users.json";
import { IUser, UsersDataFile } from "@/shared";

const usersData = usersJson as UsersDataFile;

export const getDoctorsAction = async () => {
	const doctors = usersData.users
		.filter((user) => user.role === "doctor")
		.map(({ password, ...doctor }) => doctor);

	return doctors as Omit<IUser, "password">[];
};
