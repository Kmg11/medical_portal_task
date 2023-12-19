"use client";

import { AppNextMUILink, AppSectionHeader } from "@/shared";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

export const AppointmentsHeader = () => {
	const { data: session } = useSession();

	return (
		<AppSectionHeader
			title="Appointments"
			button={
				session?.user.role === "patient" && (
					<AppNextMUILink href="/create-appointment">
						<Button variant="contained" size="small">
							New Appointment
						</Button>
					</AppNextMUILink>
				)
			}
		/>
	);
};
