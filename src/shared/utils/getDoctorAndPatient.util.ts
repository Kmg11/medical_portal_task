import { IUser, UsersDataFile } from "..";
import usersJson from "@/data/users.json";

const usersData = usersJson as UsersDataFile;

export function getDoctorAndPatient(
	doctorId: IUser["id"],
	patientId: IUser["id"]
) {
	let doctor: IUser | undefined;
	let patient: IUser | undefined;

	usersData.users.forEach((user) => {
		if (user.id === doctorId) doctor = user as IUser;
		if (user.id === patientId) patient = user as IUser;
	});

	return { doctor, patient };
}
