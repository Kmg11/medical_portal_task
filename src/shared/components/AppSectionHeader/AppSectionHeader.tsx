"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface AppSectionHeaderProps {
	title: React.ReactNode;
	button?: React.ReactNode;
}

export const AppSectionHeader = ({ button, title }: AppSectionHeaderProps) => {
	return (
		<Box
			component="header"
			sx={(theme) => ({
				display: "flex",
				alignItems: "center",
				flexDirection: { xs: "column", sm: "row" },
				justifyContent: { xs: "center", sm: "space-between" },
				flexWrap: "wrap",
				gap: 2,
				mb: 4,
				p: 2,
				backgroundColor: theme.palette.grey[900],
				borderRadius: theme.shape.borderRadius,
			})}
		>
			<Typography variant="h6" component="h1">
				{title}
			</Typography>

			{button && button}
		</Box>
	);
};
