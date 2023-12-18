"use server";

import { EmailTemplate } from "@/shared";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailActionParams {
	email: string;
	firstName: string;
	message: string;
	subject: string;
}

export const sendEmailAction = async ({
	email,
	firstName,
	message,
	subject,
}: SendEmailActionParams) => {
	try {
		const data = await resend.emails.send({
			from: "Medical Portal <onboarding@resend.dev>",
			to: [email],
			subject,
			text: message,
			react: EmailTemplate({ firstName, message }),
		});

		return data;
	} catch (error) {
		throw error;
	}
};
