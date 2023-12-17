import type { Metadata } from "next";
import { AuthHeader } from "../components";
import { SignupForm } from "./components";

export const metadata: Metadata = {
	title: "Signup",
	description: "Signup to medical portal for patients and doctors",
};

export default function SignupPage() {
	return (
		<>
			<AuthHeader
				title={"Signup"}
				subTitle={{
					text: "Already have an account",
					link: {
						text: "Signin",
						href: "/auth/signin",
					},
				}}
				containerProps={{ sx: { mb: 3 } }}
			/>

			<SignupForm />
		</>
	);
}
