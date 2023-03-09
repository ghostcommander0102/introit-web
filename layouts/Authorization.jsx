import React, { useEffect } from "react";
import { http } from "utils/http";
import { useRouter } from "next/router";
import { CurrentUser } from "/atoms/CurrentUser";
import { useRecoilState } from "recoil";
import { Loading } from "/atoms/Loading";
import Loader from "components/shared/Loader";
export default function Authorization({ children }) {
  // *********************
  // define RecoilState
  // *********************
  const [currnetUser] = useRecoilState(CurrentUser);
  const [, setLoading] = useRecoilState(Loading);
  //***************************
  // define hooks
  //***************************
  const router = useRouter();

  //***************************
  // define function
  //***************************
  const AuthRoute = (menu = "", moduleItem = "") => {
    let flag = 0;
    const target = currnetUser?.menus?.filter((item) => item?.slug == menu)[0];
    if (target) {
      target?.modules?.map((item) => {
        if (item?.slug == moduleItem) {
          flag = 1;
        }
      });
      if (flag == 0) {
        router.push("/lock");
      } else {
        setLoading(false);
      }
    } else {
      router.push("/lock");
    }
  };
  const AuthModule = (menu = "", modules = []) => {
    let flag = 0;
    const target = currnetUser?.menus?.filter((item) => item?.slug == menu)[0];
    if (target) {
      target?.modules?.map((item) => {
        if (modules.includes(item?.slug)) {
          flag = 1;
        }
      });
      if (flag == 0) {
        router.push("/lock");
      } else {
        setLoading(false);
      }
    } else {
      router.push("/lock");
    }
  };

  //***************************
  // define useEffect
  //***************************
  useEffect(() => {
    setLoading(true);
  }, [router.isReady]);
  useEffect(async () => {
    if (router?.route == "/global-setting/roles")
      AuthRoute("global-settings", "roles");
    if (router?.route == "/global-setting")
      AuthRoute("global-settings", "roles");
    if (router.route == "/global-setting/social-media")
      AuthRoute("global-settings", "social-media");
    if (router.route == "/global-setting/profile-progress")
      AuthRoute("global-settings", "percentage");
    if (router.route == "/global-setting/translation")
      AuthRoute("global-settings", "translation");
    if (router.route == "/global-setting/basic-info")
      AuthRoute("global-settings", "basic-info");
    if (router.route == "/global-setting/accesses/[id]")
      AuthRoute("global-settings", "roles");
    if (router.route == "/global-setting/accesses/permission/[id]")
      AuthRoute("global-settings", "roles");
    if (router.route == "/global-setting/accesses/menu-builder")
      AuthRoute("global-settings", "roles");
    if (router.route == "/profile") AuthRoute("profile", "my-profile");
    if (router.route == "/profile/resume") AuthRoute("profile", "resume");
    if (router.route == "/profile/user-profile")
      AuthRoute("profile", "user-profiles");
    if (router.route == "/profile/user-profile/[id]")
      AuthRoute("profile", "user-profiles");
    if (router.route == "/profile/user-profile/edit/[id]")
      AuthRoute("profile", "user-profiles");
    ///////////////////////////////////////////////////////
    if (router.route == "/settings")
      AuthModule("settings", [
        "general",
        "notifications",
        "privacy",
        "account",
      ]);
    if (router.route == "/") AuthModule("dashboard", ["overview", "recently"]);
  }, [router.isReady, currnetUser]);
  if (currnetUser?.email) return children;
  else return <Loader />;
}
