import { Box } from "@mui/material";
import React from "react";

interface AppNoDataMessageProps {
	children?: string;
}

export const AppNoDataMessage = ({ children }: AppNoDataMessageProps) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
			}}
		>
			{children || "No data found"}
		</Box>
	);
};
