import { AppSectionHeader } from "@/shared";
import { CreateAppointmentForm } from "./components";
import { checkPermissionAction } from "@/shared/actions";

export default async function CreateAppointmentPage() {
	await checkPermissionAction("patient");

	return (
		<main>
			<AppSectionHeader title="Create Appointment" />
			<CreateAppointmentForm />
		</main>
	);
}
