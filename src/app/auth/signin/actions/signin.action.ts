"use server";

import { IUser } from "@/shared";
import usersData from "@/data/users.json";

export const signinAction = async (
	loggedUser: Pick<IUser, "password" | "email">
) => {
	try {
		// * Check if user exists
		const user = usersData.users.find((u) => u.email === loggedUser.email);
		if (!user) throw new Error("User does not exist");

		// * Check if password is correct
		const passwordCorrect = user.password === loggedUser.password;
		if (!passwordCorrect) throw new Error("Password is incorrect");

		return user;
	} catch (error) {
		throw error;
	}
};
