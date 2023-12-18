import { CreateAppointmentForm, CreateAppointmentHeader } from "./components";
import { checkPermissionAction } from "@/shared/actions";

export default async function CreateAppointmentPage() {
	await checkPermissionAction("patient");

	return (
		<main>
			<CreateAppointmentHeader />
			<CreateAppointmentForm />
		</main>
	);
}
