import MuiLink, { LinkProps } from "@mui/material/Link";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export function AppNextMUILink(props: LinkProps<"a"> & NextLinkProps) {
	const { sx, ...rest } = props;

	return (
		<MuiLink
			component={NextLink}
			sx={{ textDecoration: "none", color: "inherit", ...sx }}
			{...rest}
		/>
	);
}
