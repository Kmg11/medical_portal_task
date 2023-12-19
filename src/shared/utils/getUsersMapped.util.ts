import usersJson from "@/data/users.json";
import { IUser, UsersDataFile } from "..";

const usersData = usersJson as UsersDataFile;

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
