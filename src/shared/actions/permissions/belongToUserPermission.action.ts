"use server";

import { IUser, authConfig } from "@/shared";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const belongToUserPermissionAction = async (userId: IUser["id"]) => {
	try {
		const session = await getServerSession(authConfig);
		if (!session) throw redirect("/auth/signin");

		if (session.user.id !== userId) redirect("/");
	} catch (error) {
		throw error;
	}
};
