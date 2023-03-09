import React, { useEffect } from "react";
import { http } from "utils/http";
import { useRouter } from "next/router";
import { CurrentUser } from "/atoms/CurrentUser";
import { useRecoilState } from "recoil";
import { Loading } from "/atoms/Loading";
import { Theme } from "/atoms/Theme";
import Loader from "components/shared/Loader";
export default function Authenticated({ children, back = false }) {
	// *********************
	// define RecoilState
	// *********************
	const [currnetUser, setCurrentUser] = useRecoilState(CurrentUser);
	const [, setLoading] = useRecoilState(Loading);
	const [theme, setTheme] = useRecoilState(Theme);
	//***************************
	// define hooks
	//***************************
	const router = useRouter();
	//***************************
	// define useEffect
	//***************************
	useEffect(() => {
		setLoading(true);
	}, [router.isReady]);
	useEffect(async () => {
		if (router.isReady)
			await Promise.all([
				http().CurrentUser(
					({ data }) => {
						if (data.status == 1) {
							if (back) router.replace("/");
							setCurrentUser(data?.user);
							if (data?.user?.theme?.id == 1) setTheme({ light: false });
							if (data?.user?.theme?.id == 2) setTheme({ light: true });
							if (data?.user?.theme?.id == 3)
								if (window != undefined)
									if (
										window.matchMedia("(prefers-color-scheme: light)").matches
									) {
										setTheme((prev) => {
											return {
												...prev,
												light: true,
											};
										});
									} else {
										setTheme((prev) => {
											return {
												...prev,
												light: false,
											};
										});
									}
						} else {
							router.replace("/login");
						}
					},
					(err) => {
						if (err?.response?.status == 502) {
							router.replace("/login");
						}
					}
				),
			]).finally(() => {
				setLoading(false);
			});
	}, [router.isReady]);
	if (currnetUser?.email) return children;
	else return <Loader />;
}
