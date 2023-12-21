import { getServerSession } from "next-auth";
import { getAppointmentsAction } from "./actions";
import { AppointmentsHeader, AppointmentsList } from "./components";
import { authConfig } from "@/shared";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const session = await getServerSession(authConfig);
	if (!session) return redirect("/auth/signin");

	const appointments = await getAppointmentsAction(
		session?.user._id,
		session?.user.role
	);

	return (
		<main>
			<AppointmentsHeader />
			<AppointmentsList appointments={appointments} />
		</main>
	);
}
