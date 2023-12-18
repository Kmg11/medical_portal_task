"use client";
import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { AppNextMUILink, useToggle } from "@/shared";
import { signOut, useSession } from "next-auth/react";

export function AppBar() {
	const [isDrawerOpen, toggleDrawer] = useToggle();
	const { data: session } = useSession();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<MuiAppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>

					<Drawer open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
						<List style={{ minWidth: 200 }}>
							<ListItem>
								<ListItemText>
									<AppNextMUILink href="/">Appointments</AppNextMUILink>
								</ListItemText>
							</ListItem>

							{session?.user.role === "patient" && (
								<ListItem>
									<ListItemText>
										<AppNextMUILink
											href={`/medical-records/${session.user.id}`}
										>
											My Medical Record
										</AppNextMUILink>
									</ListItemText>
								</ListItem>
							)}

							{session?.user.role === "doctor" && (
								<ListItem>
									<ListItemText>
										<AppNextMUILink href="/medical-records">
											Medical Records
										</AppNextMUILink>
									</ListItemText>
								</ListItem>
							)}
						</List>
					</Drawer>

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Medical Portal
					</Typography>

					<Button
						color="inherit"
						onClick={() => signOut({ callbackUrl: "/auth/signin" })}
					>
						Logout
					</Button>
				</Toolbar>
			</MuiAppBar>
		</Box>
	);
}
