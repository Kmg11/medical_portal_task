"use server";

import { IUser, UserModel, connectToDB } from "@/shared";

export const signinAction = async (
	loggedUser: Pick<IUser, "password" | "email">
) => {
	try {
		await connectToDB();

		// * Check if user exists
		const user = await UserModel.findOne({
			email: loggedUser.email,
		}).lean<IUser>();
		if (!user) throw new Error("User does not exist");

		// * Check if password is correct
		const passwordCorrect = user.password === loggedUser.password;
		if (!passwordCorrect) throw new Error("Password is incorrect");

		return {
			...user,
			password: undefined,
		};
	} catch (error) {
		throw error;
	}
};
