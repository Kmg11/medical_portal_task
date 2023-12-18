import NextAuth from "next-auth";
import { authConfig } from "@/shared";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
