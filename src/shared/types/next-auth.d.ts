import { IUser } from ".";

declare module "next-auth" {
	interface Session {
		user: IUser;
		error: string;
	}
}
