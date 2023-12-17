import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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

				return {
					id: "1",
					name: "John Doe",
					email: credentials.email,
					image: "",
				};
			},
		}),
	],
});

export { handler as GET, handler as POST };
