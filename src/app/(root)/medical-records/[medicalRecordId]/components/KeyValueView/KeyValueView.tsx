import { Box, Typography } from "@mui/material";
import React from "react";

interface KeyValueViewProps {
	label: string;
	value: string | number;
}

export const KeyValueView = ({ label, value }: KeyValueViewProps) => {
	return (
		<Box display="flex" alignItems="center" gap={1}>
			<Typography
				variant="body1"
				component="span"
				fontWeight="bold"
				color="text.secondary"
			>
				{label}:
			</Typography>

			<Typography variant="body1" component="span">
				{value}
			</Typography>
		</Box>
	);
};
