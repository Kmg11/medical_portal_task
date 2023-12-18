"use client";
import { IUser } from "@/shared";
import { getDoctorsAction } from "@/shared/actions";
import React from "react";

const DoctorsContext = React.createContext<{
	doctors: Omit<IUser, "password">[];
}>({ doctors: [] });

export const DoctorsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [doctors, setDoctors] = React.useState<Omit<IUser, "password">[]>([]);

	React.useEffect(() => {
		const getDoctors = async () => {
			const doctors = await getDoctorsAction();
			setDoctors(doctors);
		};

		getDoctors();
	}, []);

	return (
		<DoctorsContext.Provider value={{ doctors }}>
			{children}
		</DoctorsContext.Provider>
	);
};

export const useDoctorsContext = () => React.useContext(DoctorsContext);
