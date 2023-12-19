import { signinAction } from "@/app/auth/signin/actions";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: { signIn: "/auth/signin" },
	session: {
		strategy: "jwt",
		maxAge: Number(process.env.NEXTAUTH_SESSION_LIFETIME || 30 * 24 * 60 * 60),
	},
	jwt: {
		maxAge: Number(process.env.NEXTAUTH_JWT_LIFETIME || 30 * 24 * 60 * 60),
	},

	providers: [
		CredentialsProvider({
			id: "credentials",
			type: "credentials",
			name: "Credentials",

			credentials: {
				email: { label: "Email", type: "email", placeholder: "Email" },
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await signinAction({
					email: credentials.email,
					password: credentials.password,
				});

				return user;
			},
		}),
	],

	callbacks: {
		session: ({ session, token }) => {
			session.user = token.user as any;
			return session;
		},
		jwt: ({ token, user, session }) => {
			if (user) {
				const u = user as unknown as any;
				token.user = { ...(token.user as any), ...u };
			}
			return { ...token, ...user, ...session };
		},
	},
};
