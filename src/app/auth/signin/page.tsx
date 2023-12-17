import type { Metadata } from "next";
import { AuthHeader } from "../components";
import { SigninForm } from "./components";

export const metadata: Metadata = {
	title: "Signin",
	description: "Signin to medical portal for patients and doctors",
};

export default function SigninPage() {
	return (
		<>
			<AuthHeader
				title={"Signin"}
				subTitle={{
					text: "Don't have an account",
					link: { text: "Signup", href: "/auth/signup" },
				}}
			/>

			<SigninForm />
		</>
	);
}
