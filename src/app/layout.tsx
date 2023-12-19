import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { DoctorsProvider, NextAuthProvider } from "./providers";
import { getServerSession } from "next-auth";
import { authConfig } from "@/shared";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Medical Portal",
		default: "Medical Portal",
	},
	description: "Medical portal for patients and doctors",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authConfig);

	return (
		<html lang="en">
			<body className={roboto.className}>
				<NextAuthProvider session={session}>
					<DoctorsProvider>
						<AppRouterCacheProvider>
							<ThemeProvider theme={theme}>
								<CssBaseline />
								{children}
							</ThemeProvider>
						</AppRouterCacheProvider>
					</DoctorsProvider>
				</NextAuthProvider>
			</body>
		</html>
	);
}
