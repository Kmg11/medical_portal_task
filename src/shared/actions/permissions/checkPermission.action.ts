"use server";

import { IUser, authConfig, connectToDB } from "@/shared";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const checkPermissionAction = async (role: IUser["role"]) => {
	try {
		await connectToDB();

		const session = await getServerSession(authConfig);
		if (!session) throw redirect("/auth/signin");

		if (session.user.role !== role) redirect("/");
	} catch (error) {
		throw error;
	}
};
