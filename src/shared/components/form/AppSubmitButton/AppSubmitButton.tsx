import React from "react";
import { Button, ButtonProps, CircularProgress } from "@mui/material";

type SizeType = "small" | "medium" | "large";

type AppSubmitButtonProps = {
	children: React.ReactNode;
	loading: boolean;
	disabled?: boolean;
	size?: SizeType;
	buttonProps?: Omit<ButtonProps, "type" | "variant" | "size" | "disabled">;
};

export const AppSubmitButton = ({
	children,
	loading,
	disabled = false,
	size = "large",
	buttonProps,
}: AppSubmitButtonProps) => {
	const { sx, ...restButtonProps } = buttonProps || {};

	const sizesStyles = {
		small: { sx: { height: 31 }, loadingSize: 16 },
		medium: { sx: { height: 37 }, loadingSize: 20 },
		large: { sx: { height: 43 }, loadingSize: 22 },
	};

	return (
		<Button
			type="submit"
			variant="contained"
			size={size}
			disabled={loading || disabled}
			sx={{ ...sizesStyles[size].sx, ...sx }}
			{...restButtonProps}
		>
			{loading && <CircularProgress size={sizesStyles[size].loadingSize} />}
			{!loading && children}
		</Button>
	);
};
