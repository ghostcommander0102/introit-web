import React, { useEffect, useState } from "react";
import Head from "next/head";
import SidebarItem from "/components/includes/SidebarItem";
import Body from "./Body";
import { useRecoilState } from "recoil";
import { Theme } from "/atoms/Theme";
import { CurrentUser } from "/atoms/CurrentUser";
import { http } from "utils/http.js";
import useToast from "/hooks/useToast";
import { Sidebar } from "/atoms/Sidebar.js";
import LoadingProvider from "providers/LoadingProvider";
import InviteModal from "components/shared/InviteModal";
import { PercentageUser } from "atoms/PercentageUser";
import { Layout } from "atoms/translate/Layout";
import { Invite } from "atoms/Invite";
import SubSidebarItem from "components/includes/SubSidebarItem";
import UserHeader from "components/includes/UserHeader";
import Styles from "../styles/scss/common/Pages.module.scss";
import SidebarDrawer from "components/shared/SidebarDrawer";
import { useRouter } from "next/router";
import HeaderDrawer from "components/shared/HeaderDrawer";
const UserLayout = ({
  children,
  title,
  subSidebarContent,
  hasSubSidebar,
  hasRadius,
}) => {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [currentUser] = useRecoilState(CurrentUser);
  const [sidebarMini, setSidebarMini] = useRecoilState(Sidebar);
  const [percentage, setPercentage] = useRecoilState(PercentageUser);
  const [layoutTranslate, setLayoutTranslate] = useRecoilState(Layout);
  const [invite, setInvite] = useRecoilState(Invite);
  //***************************
  // define state
  //***************************
  const AppName = process.env.NEXT_PUBLIC_APPNAME;
  const baseUrl = process.env.NEXT_PUBLIC_API;
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(false);
  const [sidebarDrawer, setSidebarDrawer] = useState(false);
  const [HeaderDrawerr, setHeaderDrawerr] = useState(false);
  const [inviteInputs, setInviteInputs] = useState({
    email: null,
  });
  //***************************
  // define function
  //***************************
  const handleClose = () => setShow(false);

  const handleSidebarMini = () => {
    setSidebarMini(!sidebarMini);
    http().Sidebar(
      ({ data }) => {
        if (data.status == 1) {
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleCloseSidebarMobile = () => {
    setTarget(false);
  };

  const handleDuplicate = () => {
    navigator.clipboard.writeText(invite.data);
    toast({ type: "success", message: "Copied" });
  };
  const handleGetUserPercentage = () => {
    http().Percentage(
      ({ data }) => {
        if (data.status == 1) {
          setPercentage(data?.percentage);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item, index) => {
          obj[item?.slug] = item;
        });
        setLayoutTranslate(obj);
      },
      29,
      (err) => {
        console.log(err);
      }
    );
  };
  const handleSetting = () => {
    router.push("/settings");
  };

  const handleInvitationCodeModal = () => {
    setInvite((prev) => {
      return { ...prev, modal: true };
    });
    setHeaderDrawerr(false);
  };
  const handleInvitationCode = () => {
    http().InvitationCode(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data?.message });
          setInvite((prev) => {
            return { ...prev, modal: false };
          });
          setInviteInputs((prev) => {
            return { ...prev, email: null };
          });
        }
        if (data.status == -1) {
          toast({ type: "error", message: data?.error });
        }
      },
      { email: inviteInputs.email },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleLogOut = () => {
    http().Logout(
      ({ data }) => {
        if (data.status == 1) {
          toast({ type: "success", message: data.message });
          router.push("/login");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // ***************************
  // define useEffect
  // ***************************

  useEffect(async () => {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "resize",
        function (e) {
          setSize({
            width: e.target.innerWidth,
            height: e.target.innerHeight,
          });
          if (window.innerWidth < 1024) {
            setSidebarMini(true);
          }
        },
        true
      );
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (window.innerWidth < 1024) {
        setSidebarMini(true);
      }
    }
  }, []);

  useEffect(async () => {
    await Promise.all([
      handleGetUserPercentage(),
      handleGetTranslateLayout(),
    ]).finally(() => {});
  }, []);
  useEffect(() => {
    setSidebarMini(currentUser?.isSidebarMinimized);
  }, [currentUser]);

  return (
    <Body theme={theme.light}>
      <Head>
        <title>
          {AppName} | {title}
        </title>
        <meta name="description" content="Enviretech" />
        <link rel="icon" href="/assets/images/svgs/envire-icon.svg" />
      </Head>
      <LoadingProvider>
        <div
          className={
            theme.light ? Styles.lightUserLayout : Styles.darkUserLayout
          }
        >
          <div className="flex">
            <div className="md:flex hidden">
              <SidebarItem
                handleSidebarMini={handleSidebarMini}
                theme={theme.light}
                sidebarMini={sidebarMini}
                target={target}
                handleCloseSidebarMobile={handleCloseSidebarMobile}
                size={size}
                baseUrl={baseUrl}
                currentUser={currentUser}
                percentage={percentage}
                layoutTranslate={layoutTranslate}
              />
              {hasSubSidebar ? (
                <SubSidebarItem>{subSidebarContent}</SubSidebarItem>
              ) : null}
            </div>
            <div className="w-full">
              <div className="flex md:justify-end justify-between w-full">
                <UserHeader
                  router={router}
                  setHeaderDrawerr={setHeaderDrawerr}
                  setSidebarDrawer={setSidebarDrawer}
                  handleSetting={handleSetting}
                  sidebarMini={sidebarMini}
                  theme={theme.light}
                  currentUser={currentUser}
                  handleInvitationCodeModal={handleInvitationCodeModal}
                  layoutTranslate={layoutTranslate}
                  percentage={percentage}
                  handleLogOut={handleLogOut}
                />
              </div>
              <div
                style={{ borderTopLeftRadius: hasRadius ? 30 : 0 }}
                className={`${!hasSubSidebar ? "perfect-wrapper" : ""} ${
                  theme?.light ? Styles.lightRoot : Styles.darkRoot
                }`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>

        <InviteModal
          onFinish={handleInvitationCode}
          inviteInputs={inviteInputs}
          setInviteInputs={setInviteInputs}
          handleClose={() => {
            setInvite((prev) => {
              return { ...prev, modal: false };
            });
          }}
          theme={theme.light}
          show={invite.modal}
          inviteCode={invite.data}
          handleDuplicate={handleDuplicate}
          layoutTranslate={layoutTranslate}
        />
        <SidebarDrawer
          visible={sidebarDrawer}
          onClose={() => setSidebarDrawer(false)}
          currentUser={currentUser}
          theme={theme.light}
          router={router}
          layoutTranslate={layoutTranslate}
        />
        <HeaderDrawer
          handleInvitationCodeModal={handleInvitationCodeModal}
          theme={theme?.light}
          onClose={() => setHeaderDrawerr(false)}
          layoutTranslate={layoutTranslate}
          visible={HeaderDrawerr}
          handleSetting={handleSetting}
        />
      </LoadingProvider>
    </Body>
  );
};

export default UserLayout;
