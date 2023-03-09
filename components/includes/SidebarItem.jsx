import React from "react";
import Link from "next/link";
import { Col, Row } from "antd";
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
import LogoMini from "/public/assets/images/svgs/logo-mobile-icon.svg";
import LogoMiniDark from "/public/assets/images/svgs/dark/logo-mobile-icon.svg";
import Styles from "/styles/scss/dashboard/Sidebar.module.scss";
import SidebarTab from "../shared/SidebarTab";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import SidebarMenu from "components/shared/SidebarMenu";

export default function SidebarItem({
  sidebarMini,
  theme,
  currentUser,
  layoutTranslate,
  handleSidebarMini,
  size,
}) {
  //**************************
  // define hook
  //**************************
  const router = useRouter();
  return (
    <Row className={sidebarMini ? Styles.sidebarMini : Styles.sidebar}>
      <Col md={{ span: 24 }} span={24}>
        <div className="pl-4">
          <div className="pb-10">
            <div>
              {sidebarMini ? (
                theme ? (
                  <LogoMini />
                ) : (
                  <LogoMiniDark />
                )
              ) : theme ? (
                <Logo />
              ) : (
                <LogoDark />
              )}
            </div>
          </div>
          {!sidebarMini && currentUser ? (
            <p className={theme ? Styles.lightName : Styles.darkName}>
              {currentUser?.givenName + " " + currentUser?.familyName}
            </p>
          ) : null}
          <div className="flex justify-between">
            {!sidebarMini ? (
              <div>
                <p
                  className={theme ? Styles.lightJobTitle : Styles.darkJobTitle}
                >
                  {!isEmpty(currentUser) ? currentUser?.jobTitle : ""}
                </p>
              </div>
            ) : null}
            <div
              className={sidebarMini ? "pl-0.5" : "flex items-center pt-2 pr-4"}
            >
              <button
                onClick={
                  size.width >= 1024 ? () => handleSidebarMini() : () => {}
                }
                style={{ transform: sidebarMini ? "rotate(180deg)" : "" }}
                className={Styles.buttonClose}
              >
                <ArrowLeft />
              </button>
            </div>
          </div>
        </div>
        <div className={Styles.wrapperSidebar}>
          <div>
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
                  <SidebarMenu
                    key={index}
                    active={router.route == "/company/profile"}
                    items={[
                      {
                        key: index + "a",
                        label: (
                          <div className="flex items-center h-full">
                            <div>
                              {router.route == "/company/profile" ? (
                                theme ? (
                                  <Company />
                                ) : (
                                  <CompanyDark />
                                )
                              ) : theme ? (
                                <Company />
                              ) : (
                                <CompanyDark />
                              )}
                            </div>
                            <div className="pl-6">
                              <p
                                className={`${
                                  theme ? Styles.lightText : Styles.darkText
                                } ${
                                  router.route == "/company/profile"
                                    ? Styles.activeText
                                    : null
                                } `}
                              >
                                {layoutTranslate["company"]?.title}
                              </p>
                            </div>
                          </div>
                        ),
                        children: item.modules.map((item, index) => {
                          if (item?.slug == "profile") {
                            return {
                              key: index + "b",
                              label: (
                                <div
                                  className={
                                    router.route == "/company/profile"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/company/profile">
                                    <a> {layoutTranslate["profile"]?.title} </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "members") {
                            return {
                              key: index + "c",
                              label: (
                                <div
                                  className={
                                    router.route == "/company/members"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/company/members">
                                    <a> {layoutTranslate["members"]?.title} </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "projects") {
                            return {
                              key: index + "d",
                              label: (
                                <div
                                  className={
                                    router.route == "/company/projects"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/company/projects">
                                    <a>
                                      {" "}
                                      {layoutTranslate["projects"]?.title}{" "}
                                    </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "timesheets") {
                            return {
                              key: index + "e",
                              label: (
                                <div
                                  className={
                                    router.route == "/company/timesheets"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/company/timesheets">
                                    <a>
                                      {layoutTranslate["timesheets"]?.title}{" "}
                                    </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "invoices") {
                            return {
                              key: index + "f",
                              label: (
                                <div
                                  className={
                                    router.route == "/company/invoices"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/company/invoices">
                                    <a>
                                      {" "}
                                      {layoutTranslate["invoices"]?.title}{" "}
                                    </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "roles") {
                            return {
                              key: index + "g",
                              label: (
                                <div
                                  className={
                                    router.route == "/company/roles"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/company/roles">
                                    <a> {layoutTranslate["roles"]?.title} </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                        }),
                      },
                    ]}
                  />
                );
              }
              if (item?.slug == "jobs") {
                return (
                  <SidebarMenu
                    key={index}
                    items={[
                      {
                        key: index + "h",
                        label: (
                          <div className="flex items-center h-full">
                            <div>
                              {router.route == "/jobs" ? (
                                theme ? (
                                  <JobActive />
                                ) : (
                                  <JobActiveDark />
                                )
                              ) : theme ? (
                                <Job />
                              ) : (
                                <JobDark />
                              )}
                            </div>
                            <div className="pl-6">
                              <p
                                className={`${
                                  theme ? Styles.lightText : Styles.darkText
                                } ${
                                  router.route == "/jobs"
                                    ? Styles.activeText
                                    : null
                                } `}
                              >
                                {layoutTranslate["jobs"]?.title}
                              </p>
                            </div>
                          </div>
                        ),
                        children: item.modules.map((item, index) => {
                          if (item?.slug == "search") {
                            return {
                              key: index + "i",
                              label: (
                                <div
                                  className={
                                    router.route == "/jobs/search"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/jobs/search">
                                    <a>
                                      {layoutTranslate["search-jobs"]?.title}
                                    </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "manage") {
                            return {
                              key: index + "j",
                              label: (
                                <div
                                  className={
                                    router.route == "/jobs/manage"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/jobs/manage">
                                    <a>
                                      {layoutTranslate["manage-jobs"]?.title}
                                    </a>
                                  </Link>{" "}
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "applied") {
                            return {
                              key: index + "k",
                              label: (
                                <div
                                  className={
                                    router.route == "/jobs/manage"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/jobs/manage">
                                    <a>
                                      {layoutTranslate["applied-jobs"]?.title}
                                    </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                          if (item?.slug == "post") {
                            return {
                              key: index + "l",
                              label: (
                                <div
                                  className={
                                    router.route == "/jobs/post"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/jobs/post">
                                    <a>
                                      {layoutTranslate["post-a-job"]?.title}
                                    </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                        }),
                      },
                    ]}
                  />
                );
              }
              if (item?.slug == "projects") {
                return (
                  <SidebarMenu
                    key={index}
                    items={[
                      {
                        key: index + "m",
                        label: (
                          <div className="flex items-center h-full">
                            <div>
                              {router.route == "/projects" ? (
                                theme ? (
                                  <JobActive />
                                ) : (
                                  <JobActiveDark />
                                )
                              ) : theme ? (
                                <Projects />
                              ) : (
                                <ProjectsDark />
                              )}
                            </div>
                            <div className="pl-6">
                              <p
                                className={`${
                                  theme ? Styles.lightText : Styles.darkText
                                } ${
                                  router.route == "/projects"
                                    ? Styles.activeText
                                    : null
                                } `}
                              >
                                {layoutTranslate["projects"]?.title}
                              </p>
                            </div>
                          </div>
                        ),
                        children: item.modules.map((item, index) => {
                          if (item?.slug == "list") {
                            return {
                              key: index + "n",
                              label: (
                                <div
                                  className={
                                    router.route == "/jobs/list"
                                      ? theme
                                        ? Styles.lightActiveSubTab
                                        : Styles.darkActiveSubTab
                                      : Styles.subTab
                                  }
                                >
                                  <Link href="/projects/list">
                                    <a> {layoutTranslate["list"]?.title} </a>
                                  </Link>
                                </div>
                              ),
                            };
                          }
                        }),
                      },
                    ]}
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
                  <SidebarTab
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
              if (item?.slug == "supports") {
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
      </Col>
    </Row>
  );
}
