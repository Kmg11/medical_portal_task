import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					marginTop: 8,
					marginBottom: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{children}
			</Box>
		</Container>
	);
}
