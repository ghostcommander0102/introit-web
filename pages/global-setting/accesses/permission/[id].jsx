import React, { useState, useEffect } from "react";
import Authenticated from "layouts/Authenticated";
import UserLayout from "layouts/UserLayout";
import { Theme } from "atoms/Theme";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { http } from "utils/http";
import useToast from "hooks/useToast";
import { Permission } from "atoms/global/Permission";
import { GlobalSettings } from "atoms/translate/GlobalSettings";
import { isEmpty } from "lodash";
import { Breadcrumb, Col, Row } from "antd";
import BreadcrumbItem from "components/shared/BreadcrumbItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import PagesStyles from "/styles/scss/common/Pages.module.scss";
import HeaderAccess from "components/shared/HeaderAccess";
import RowAccess from "components/shared/RowAccess";
import ButtonTabBar from "components/shared/ButtonTabBar";
import DashboardIcon from "/public/assets/images/svgs/dashboard-icon.svg";
import DashboardActiveIcon from "/public/assets/images/svgs/active/dashboard-icon.svg";
import DashboardDarkIcon from "/public/assets/images/svgs/dark/dashboard-icon.svg";
import DashboardActiveDarkIocn from "/public/assets/images/svgs/active/dark/dashboard-icon.svg";
import MessageIcon from "/public/assets/images/svgs/email2-icon.svg";
import MessageActive from "/public/assets/images/svgs/message-icon-active.svg";
import MessageDarkIcon from "/public/assets/images/svgs/dark/message-icon.svg";
import MessageDarkIconActive from "/public/assets/images/svgs/dark/message-icon-icon.svg";
import Support from "/public/assets/images/svgs/question2-icon.svg";
import SupportActive from "/public/assets/images/svgs/question2-icon-active.svg";
import SupportDark from "/public/assets/images/svgs/dark/support-icon.svg";
import SupportDarkActive from "/public/assets/images/svgs/dark/support-active-icon.svg";
import Job from "/public/assets/images/svgs/skill2-icon.svg";
import JobActive from "/public/assets/images/svgs/active/mange-job-icon.svg";
import JobDark from "/public/assets/images/svgs/dark/job-icon.svg";
import JobActiveDark from "/public/assets/images/svgs/active/dark/mange-job-icon.svg";
import Company from "/public/assets/images/svgs/companyy-icon.svg";
import CompanyActive from "/public/assets/images/svgs/companyy-active-icon.svg";
import CompanyActiveDark from "/public/assets/images/svgs/dark/companyy-active-icon.svg";
import CompanyDark from "/public/assets/images/svgs/dark/companyy-icon.svg";
import Access from "/public/assets/images/svgs/access.svg";
import AccessActive from "/public/assets/images/svgs/access-active.svg";
import AccessDark from "/public/assets/images/svgs/dark/access.svg";
import AccessActiveDark from "/public/assets/images/svgs/dark/access-active.svg";
import Blog from "/public/assets/images/svgs/blog-icon.svg";
import BlogActive from "/public/assets/images/svgs/blog-icon-active.svg";
import BlogDark from "/public/assets/images/svgs/dark/blog-icon.svg";
import BlogActiveDark from "/public/assets/images/svgs/dark/blog-active-icon.svg";
import Profile from "/public/assets/images/svgs/user2-icon.svg";
import ProfileActive from "/public/assets/images/svgs/user2-active-icon.svg";
import ProfileDark from "/public/assets/images/svgs/dark/user1-icon.svg";
import ProfileActiveDark from "/public/assets/images/svgs/dark/user2-active-icon.svg";
import Projects from "/public/assets/images/svgs/projects-icon.svg";
import ProjectsDark from "/public/assets/images/svgs/dark/projects-icon.svg";
import ContentWrapper from "components/shared/ContentWrapper";
import RoleEdiotr from "components/shared/RoleEditor";
import RoleModal from "components/shared/global/RoleModal";
import { Errors } from "atoms/Errors";
import PermissionTabSlider from "components/shared/PermissionTabSlider";
import Authorization from "layouts/Authorization";
import Link from "next/link";
export default function GlobalSetting() {
  //***************************
  // define hooks
  //***************************
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  //***************************
  // define RecoilState
  //***************************
  const [theme] = useRecoilState(Theme);
  const [errors, setErrors] = useRecoilState(Errors);
  const [permission, setPermission] = useRecoilState(Permission);
  const [globalSettingTranslate, setGlobalSettingTranslate] =
    useRecoilState(GlobalSettings);
  //***************************
  // define state
  //***************************
  const [permissionTab, setPermissionTab] = useState("Dashboard");
  const [inputsRole, setInputsRole] = useState({ name: "" });
  const [, setIsCreateRole] = useState(false);
  const [visibleRole, setVisibleRole] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [, setIsEditRole] = useState(false);
  const [editId, setEditId] = useState("");
  //***************************
  // define function
  //***************************

  // Start Role

  const handleOpenRoleModalEdit = () => {
    setIsEditRole(true);
    setEditId(id);
    setVisibleRole(true);
    setInputsRole((prev) => {
      return { ...prev, name: permission?.roleName };
    });
  };

  const handleEditRole = () => {
    http().RoleEdit(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          setErrors([]);
          setIsEditRole(false);
          setEditId("");
          handleCloseRoleModal();
          setIsCreateRole(false);
          setVisibleRole(false);
        }
      },
      { id: editId, title: inputsRole.name },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleCloseRoleModal = () => {
    setVisibleRole(false);
  };

  // End Role

  // Start Permission

  const handleGetPermissionList = (id) => {
    http().PermissionList(
      ({ data }) => {
        if (data.status == 1) {
          setPermission(data);
          setIsCreateRole(true);
          setRoleId(id);
        }
      },
      id,
      (err) => {
        console.log(err);
      }
    );
  };
  const handlePermissionTab = (tab) => {
    setPermissionTab(tab);
  };
  const handleEditPermission = (roleId, moduleId, permission, value) => {
    http().PermissionEdit(
      ({ data }) => {
        if (data.status == 1) {
          toast({ message: data.message, type: "success" });
          handleGetPermissionList(roleId);
        }
      },
      {
        roleId: roleId,
        moduleId: moduleId,
        permission: permission,
        value: value,
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // End permission

  const handleGetTranslateLayout = () => {
    http().TranslateLabel(
      ({ data }) => {
        const obj = {};
        data?.list?.map((item) => {
          obj[item?.slug] = item;
        });
        setGlobalSettingTranslate(obj);
      },
      51,
      (err) => {
        console.log(err);
      }
    );
  };

  //***************************
  // define useEffect
  //***************************

  useEffect(() => {
    handleGetTranslateLayout();
  }, []);
  useEffect(() => {
    if (id != null) handleGetPermissionList(id);
  }, [visibleRole, id]);

  return (
    <Authenticated removeLoader={false} back={false}>
      <UserLayout
        subSidebarContent={
          <div
            className={
              theme.light
                ? PagesStyles.lightResumeWrapper
                : PagesStyles.darkResumeWrapper
            }
          >
            <div>
              <div style={{ marginTop: 48 }}>
                <RoleEdiotr
                  onClick={handleOpenRoleModalEdit}
                  text={permission?.roleName}
                  theme={theme?.light}
                />
              </div>
              <div className="pt-8">
                <ButtonTabBar
                  theme={theme.light}
                  current={"Dashboard"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Dashboard")}
                  active={permissionTab == "Dashboard"}
                  lightIcon={<DashboardIcon />}
                  darkIcon={<DashboardDarkIcon />}
                  activeLightIcon={<DashboardActiveIcon />}
                  activeDarkIcon={<DashboardActiveDarkIocn />}
                  text={globalSettingTranslate["dashboard"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Profile"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Profile")}
                  active={permissionTab == "Profile"}
                  lightIcon={<Profile />}
                  darkIcon={<ProfileDark />}
                  activeLightIcon={<ProfileActive />}
                  activeDarkIcon={<ProfileActiveDark />}
                  text={globalSettingTranslate["profile"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Company"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Company")}
                  active={permissionTab == "Company"}
                  lightIcon={<Company />}
                  darkIcon={<CompanyDark />}
                  activeLightIcon={<CompanyActive />}
                  activeDarkIcon={<CompanyActiveDark />}
                  text={globalSettingTranslate["companies"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Jobs"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Jobs")}
                  active={permissionTab == "Jobs"}
                  lightIcon={<Job />}
                  darkIcon={<JobDark />}
                  activeLightIcon={<JobActive />}
                  activeDarkIcon={<JobActiveDark />}
                  text={globalSettingTranslate["jobs"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Projects"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Projects")}
                  active={permissionTab == "Projects"}
                  lightIcon={<Projects />}
                  darkIcon={<ProjectsDark />}
                  activeLightIcon={<JobActive />}
                  activeDarkIcon={<JobActiveDark />}
                  text={globalSettingTranslate["projects"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Blog"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Blog")}
                  active={permissionTab == "Blog"}
                  lightIcon={<Blog />}
                  darkIcon={<BlogDark />}
                  activeLightIcon={<BlogActive />}
                  activeDarkIcon={<BlogActiveDark />}
                  text={globalSettingTranslate["blog"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Global Settings"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Global Settings")}
                  active={permissionTab == "Global Settings"}
                  lightIcon={<Access />}
                  darkIcon={<AccessDark />}
                  activeLightIcon={<AccessActive />}
                  activeDarkIcon={<AccessActiveDark />}
                  text={globalSettingTranslate["global-setting"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Messages"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Messages")}
                  active={permissionTab == "Messages"}
                  lightIcon={<MessageIcon />}
                  darkIcon={<MessageDarkIcon />}
                  activeLightIcon={<MessageActive />}
                  activeDarkIcon={<MessageDarkIconActive />}
                  text={globalSettingTranslate["messages"]?.title}
                />
              </div>
              <div>
                <ButtonTabBar
                  theme={theme.light}
                  current={"Support"}
                  tab={permissionTab}
                  handleChangeTab={() => handlePermissionTab("Support")}
                  active={permissionTab == "Support"}
                  lightIcon={<Support />}
                  darkIcon={<SupportDark />}
                  activeLightIcon={<SupportActive />}
                  activeDarkIcon={<SupportDarkActive />}
                  text={globalSettingTranslate["support"]?.title}
                />
              </div>
            </div>
          </div>
        }
        hasSubSidebar={true}
        hasRadius={false}
        title="role info"
      >
        <Authorization>
          <Row>
            <Col
              span={24}
              className={`${
                theme?.light
                  ? PagesStyles.lightWrapperSlider
                  : PagesStyles.darkWrapperSlider
              } md:hidden block px-4 py-2`}
            >
              <PermissionTabSlider
                theme={theme?.light}
                permissionTab={permissionTab}
                handlePermissionTab={handlePermissionTab}
                globalSettingTranslate={globalSettingTranslate}
              />
            </Col>
            <Col span={24}>
              <div
                style={{ height: 52 }}
                className="md:p-4 py-2 px-2 wrapper-bread-setting"
              >
                <BreadcrumbItem>
                  <Breadcrumb.Item onClick={() => {}}>
                    <Link href="/">
                      <span
                        className={
                          theme?.light
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {globalSettingTranslate["dashboard"]?.title}
                      </span>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    onClick={() => router.push("/global-setting")}
                  >
                    <span
                      className={
                        theme?.light
                          ? BreadcrumbStyles.lightItem
                          : BreadcrumbStyles.darkItem
                      }
                    >
                      {globalSettingTranslate["global-setting"]?.title}
                    </span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item
                    onClick={() => router.push("/global-setting")}
                  >
                    <span
                      className={
                        theme?.light
                          ? BreadcrumbStyles.lightItem
                          : BreadcrumbStyles.darkItem
                      }
                    >
                      {globalSettingTranslate["accesses"]?.title}
                    </span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span
                      className={
                        theme?.light
                          ? BreadcrumbStyles.lightLast
                          : BreadcrumbStyles.darkLast
                      }
                    >
                      {permission?.roleName}
                    </span>
                  </Breadcrumb.Item>
                </BreadcrumbItem>
              </div>
            </Col>
            <Col span={24} className="md:hidden block px-2">
              <RoleEdiotr
                height={35}
                onClick={handleOpenRoleModalEdit}
                text={permission?.roleName}
                theme={theme?.light}
              />
            </Col>
            <Col span={24}>
              <ContentWrapper theme={theme?.light}>
                {!isEmpty(permission)
                  ? permission?.access?.map((item, index) => {
                      if (item.title == permissionTab)
                        return (
                          <Row key={index} className="mb-10 pb-10 md:px-2">
                            <Col span={24} className="pb-4">
                              <HeaderAccess
                                permissionTab={permissionTab}
                                translator={globalSettingTranslate}
                                data={item}
                                theme={theme?.light}
                              />
                            </Col>
                            {!isEmpty(item?.modules)
                              ? item?.modules.map((prop, key) => {
                                  console.log("prop", prop);
                                  return (
                                    <Col key={key} span={24} className="pb-1.5">
                                      <RowAccess
                                        translator={globalSettingTranslate}
                                        roleId={roleId}
                                        handleEditPermission={
                                          handleEditPermission
                                        }
                                        data={prop}
                                        theme={theme?.light}
                                        bgGray={true}
                                      />
                                    </Col>
                                  );
                                })
                              : null}
                          </Row>
                        );
                    })
                  : null}
              </ContentWrapper>
            </Col>
          </Row>
          <RoleModal
            isEditRole={true}
            handleEditRole={handleEditRole}
            errors={errors}
            inputsRole={inputsRole}
            setInputsRole={setInputsRole}
            theme={theme.light}
            visible={visibleRole}
            handleClose={handleCloseRoleModal}
            globalSettingTranslate={globalSettingTranslate}
          />{" "}
        </Authorization>
      </UserLayout>
    </Authenticated>
  );
}
