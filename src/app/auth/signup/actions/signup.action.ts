"use server";

import { IUser, UserModel, connectToDB } from "@/shared";

export const signupAction = async (
	user: Pick<IUser, "firstName" | "lastName" | "password" | "role" | "email">
) => {
	try {
		await connectToDB();

		const newUser: Omit<IUser, "_id"> = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password,
			role: user.role,
		};

		await UserModel.create(newUser);
	} catch (error) {
		throw error;
	}
};
