import { AppNextMUILink } from "@/shared";
import LockOutlined from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AuthHeaderProps {
	title: string;
	subTitle?: {
		text: string;
		link?: { text: string; href: string };
	};
	containerProps?: Omit<BoxProps, "component">;
}

export const AuthHeader = ({
	title,
	subTitle,
	containerProps,
}: AuthHeaderProps) => {
	const { sx, ...restContainerProps } = containerProps || {};

	return (
		<Box
			component="header"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				mb: 1,
				...sx,
			}}
			{...restContainerProps}
		>
			<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
				<LockOutlined sx={{ color: "#fff" }} />
			</Avatar>

			<Typography component="h1" variant="h5" sx={{ mb: 1 }}>
				{title}
			</Typography>

			{subTitle && (
				<Typography component="p" variant="body2" color="white">
					{subTitle.text}{" "}
					{subTitle.link && (
						<AppNextMUILink
							href={subTitle.link.href}
							sx={{
								color: "primary.main",

								"&:hover": { textDecoration: "underline" },
							}}
						>
							{subTitle.link.text}
						</AppNextMUILink>
					)}
				</Typography>
			)}
		</Box>
	);
};
