import React from "react";
import { Drawer } from "antd";
import DashboardIocn from "/public/assets/images/svgs/dashboard-icon.svg";
import DashboardActiveIocn from "/public/assets/images/svgs/active/dashboard-icon.svg";
import DashboardDarkIocn from "/public/assets/images/svgs/dark/dashboard-icon.svg";
import DashboardActiveDarkIocn from "/public/assets/images/svgs/active/dark/dashboard-icon.svg";
import MessageIcon from "/public/assets/images/svgs/email2-icon.svg";
import MessageDarkIcon from "/public/assets/images/svgs/dark/message-icon.svg";
import Support from "/public/assets/images/svgs/question2-icon.svg";
import SupportDark from "/public/assets/images/svgs/dark/support-icon.svg";
import Job from "/public/assets/images/svgs/skill2-icon.svg";
import JobActive from "/public/assets/images/svgs/active/mange-job-icon.svg";
import JobDark from "/public/assets/images/svgs/dark/job-icon.svg";
import JobActiveDark from "/public/assets/images/svgs/active/dark/mange-job-icon.svg";
import ArrowLeft from "/public/assets/images/svgs/close-side-icon.svg";
import Company from "/public/assets/images/svgs/companyy-icon.svg";
import CompanyDark from "/public/assets/images/svgs/dark/companyy-icon.svg";
import Access from "/public/assets/images/svgs/access.svg";
import AccessActive from "/public/assets/images/svgs/access-active.svg";
import AccessDark from "/public/assets/images/svgs/dark/access.svg";
import AccessActiveDark from "/public/assets/images/svgs/dark/access-active.svg";
import Projects from "/public/assets/images/svgs/projects-icon.svg";
import ProjectsDark from "/public/assets/images/svgs/dark/projects-icon.svg";
import Blog from "/public/assets/images/svgs/blog-icon.svg";
import BlogDark from "/public/assets/images/svgs/dark/blog-icon.svg";
import Logo from "/public/assets/images/svgs/envire-logo.svg";
import LogoDark from "/public/assets/images/svgs/dark/envire-logo.svg";
import Close from "/public/assets/images/svgs/close-drawer.svg";
import Styles from "/styles/scss/dashboard/SidebarDrawer.module.scss";
import SidebarTab from "../shared/SidebarTab";
import { isEmpty } from "lodash";
import SidebarTabButton from "./SidebarTabButton";
export default function SidebarDrawer({
  visible,
  onClose,
  currentUser,
  theme,
  router,
  layoutTranslate,
  setGlobalDrawer,
}) {
  return (
    <Drawer
      headerStyle={{ display: "none" }}
      placement="left"
      onClose={onClose}
      visible={visible}
      bodyStyle={{ padding: 0, backgroundColor: theme ? "#ffffff" : "#191a24" }}
    >
      <div>
        <div className="pt-4 px-4 flex justify-between items-center">
          <div>{theme ? <Logo /> : <LogoDark />}</div>
          <div className="flex items-center">
            <div className={Styles.seprator}></div>
            <div onClick={onClose} className="pl-8">
              <Close />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col justify-start py-8 pl-4">
            {currentUser ? (
              <div>
                <p className={theme ? Styles.lightName : Styles.darkName}>
                  {currentUser?.givenName + " " + currentUser?.familyName}
                </p>
              </div>
            ) : null}
            <div className="flex justify-between">
              <div>
                <p
                  className={theme ? Styles.lightJobTitle : Styles.darkJobTitle}
                >
                  {!isEmpty(currentUser) ? currentUser?.jobTitle : ""}
                </p>
              </div>
              <div className={"flex items-center pt-1.5"}>
                <button onClick={onClose} className={Styles.buttonClose}>
                  <ArrowLeft />
                </button>
              </div>
            </div>
          </div>
          {currentUser?.menus?.map((item, index) => {
            if (item?.slug == "dashboard") {
              return (
                <SidebarTab
                  key={index + "aa"}
                  href="/"
                  theme={theme}
                  active={router.route == "/" ? true : false}
                  icon={
                    router.route == "/" ? (
                      theme ? (
                        <DashboardActiveIocn />
                      ) : (
                        <DashboardActiveDarkIocn />
                      )
                    ) : theme ? (
                      <DashboardIocn />
                    ) : (
                      <DashboardDarkIocn />
                    )
                  }
                  title={layoutTranslate["dashboard"]?.title}
                />
              );
            }
            if (item?.slug == "company") {
              return (
                <SidebarTabButton
                  icon={
                    router.route == "/company/profile" ? (
                      theme ? (
                        <Company />
                      ) : (
                        <CompanyDark />
                      )
                    ) : theme ? (
                      <Company />
                    ) : (
                      <CompanyDark />
                    )
                  }
                  key={index}
                  active={router.route == "/company/profile"}
                  title={layoutTranslate["company"]?.title}
                  theme={theme}
                />
              );
            }
            if (item?.slug == "Jobs") {
              return (
                <SidebarTabButton
                  key={index}
                  icon={
                    router.route == "/jobs" ? (
                      theme ? (
                        <JobActive />
                      ) : (
                        <JobActiveDark />
                      )
                    ) : theme ? (
                      <Job />
                    ) : (
                      <JobDark />
                    )
                  }
                  title={layoutTranslate["jobs"]?.title}
                  theme={theme}
                />
              );
            }
            if (item?.slug == "projects") {
              return (
                <SidebarTabButton
                  title={layoutTranslate["projects"]?.title}
                  theme={theme}
                  key={index}
                  icon={
                    router.route == "/projects" ? (
                      theme ? (
                        <JobActive />
                      ) : (
                        <JobActiveDark />
                      )
                    ) : theme ? (
                      <Projects />
                    ) : (
                      <ProjectsDark />
                    )
                  }
                />
              );
            }

            if (item?.slug == "global-settings") {
              return (
                <SidebarTab
                  key={index + "aa"}
                  href="/global-setting"
                  theme={theme}
                  active={router.route == "/global-setting" ? true : false}
                  icon={
                    router.route == "/global-setting" ? (
                      theme ? (
                        <AccessActive />
                      ) : (
                        <AccessActiveDark />
                      )
                    ) : theme ? (
                      <Access />
                    ) : (
                      <AccessDark />
                    )
                  }
                  title={layoutTranslate["global-setting"]?.title}
                />
              );
            }
            if (item?.slug == "blog") {
              return (
                <SidebarTabButton
                  key={index + "cc"}
                  href="/blog"
                  theme={theme}
                  active={router.route == "/blog" ? true : false}
                  icon={
                    router.route == "/blog" ? (
                      theme ? (
                        <DashboardActiveIocn />
                      ) : (
                        <DashboardActiveDarkIocn />
                      )
                    ) : theme ? (
                      <Blog />
                    ) : (
                      <BlogDark />
                    )
                  }
                  title={layoutTranslate["blog"]?.title}
                />
              );
            }

            if (item?.slug == "messages") {
              return (
                <SidebarTab
                  key={index + "dd"}
                  theme={theme}
                  active={router.route == "/message" ? true : false}
                  icon={theme ? <MessageIcon /> : <MessageDarkIcon />}
                  title={layoutTranslate["messages"]?.title}
                />
              );
            }
            if (item?.slug == "Supports") {
              return (
                <SidebarTab
                  key={index + "ff"}
                  theme={theme}
                  active={router.route == "/support" ? true : false}
                  icon={theme ? <Support /> : <SupportDark />}
                  title={layoutTranslate["support"]?.title}
                />
              );
            }
          })}
        </div>
      </div>
    </Drawer>
  );
}
