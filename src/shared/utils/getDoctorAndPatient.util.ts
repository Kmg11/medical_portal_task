import { IUser } from "..";
import usersData from "@/data/users.json";

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
