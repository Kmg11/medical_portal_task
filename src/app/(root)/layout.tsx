import { Container } from "@mui/material";
import { AppBar } from "./components";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AppBar />

			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				{children}
			</Container>
		</>
	);
}
