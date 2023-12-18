import usersData from "@/data/users.json";
import { IUser } from "..";

export const getUsersMapped = () => {
	const usersMap = usersData.users
		.map(({ password, ...user }) => {
			return user;
		})
		.reduce((acc, user) => {
			acc[user.id] = user as IUser;

			return acc;
		}, {} as Record<IUser["id"], IUser>);

	return usersMap;
};
