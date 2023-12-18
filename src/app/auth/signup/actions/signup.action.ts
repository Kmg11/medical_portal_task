"use server";

import fs from "fs";
import { IUser } from "@/shared";
import usersData from "@/data/users.json";

export const signupAction = async (
	user: Pick<IUser, "firstName" | "lastName" | "password" | "role" | "email">
) => {
	try {
		const newUser: IUser = {
			id: `${usersData.index}`,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password,
			role: user.role,
			medicalRecordId: null,
		};

		const newUsersData = {
			index: usersData.index + 1,
			users: [...usersData.users, newUser],
		};

		// * Update appointments.json
		await fs.promises.writeFile(
			"src/data/users.json",
			JSON.stringify(newUsersData),
			"utf8"
		);
	} catch (error) {
		throw error;
	}
};
