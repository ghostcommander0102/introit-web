import React from "react";
import { Breadcrumb, Col, Empty, Row } from "antd";
import { isEmpty } from "lodash";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Pages from "/styles/scss/common/Pages.module.scss";
import RoleItem from "./RoleItem";
import BreadcrumbItem from "../BreadcrumbItem";
import Link from "next/link";
import HeadButton from "../HeadButton";
import HeadPlus from "/public/assets/images/svgs/plus-head.svg";
import HeadPlusDark from "/public/assets/images/svgs/dark/plus-head.svg";
import HeadPlusButton from "../HeadPlusButton";
import ContentWrapper from "../ContentWrapper";
import ResuemTabSlider from "../ResumeTabSlider";
import GlobalTabSlider from "./GlobalTabSlider";
export default function SettingRoleContent({
  theme,
  handleOpenRoleModalEdit,
  role,
  handleGetPermissionList,
  handleDeleteRole,
  handleSetDefaultRole,
  handleChangeRouteRole,
  globalSettingTranslate,
  handleOpenRoleModal,
  handleChangeTab,
  tab,
  router,
}) {
  return !isEmpty(role) ? (
    <Row>
      <Col style={{ height: 52 }} className="p-4 md:block hidden" span={24}>
        <Row>
          <Col span={12}>
            <BreadcrumbItem>
              <Breadcrumb.Item onClick={() => {}}>
                <Link href="/">
                  <a>
                    <span
                      className={
                        theme
                          ? BreadcrumbStyles.lightItem
                          : BreadcrumbStyles.darkItem
                      }
                    >
                      {globalSettingTranslate["dashboard"]?.title}
                    </span>
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightItem
                      : BreadcrumbStyles.darkItem
                  }
                >
                  {globalSettingTranslate["global-setting"]?.title}
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => {}}>
                <span
                  className={
                    theme
                      ? BreadcrumbStyles.lightLast
                      : BreadcrumbStyles.darkLast
                  }
                >
                  {globalSettingTranslate["accesses"]?.title}
                </span>
              </Breadcrumb.Item>
            </BreadcrumbItem>
          </Col>
          <Col className="justify-end flex" span={12}>
            <HeadButton
              inGlobal={true}
              onClick={handleOpenRoleModal}
              text={globalSettingTranslate["add-new-role"]?.title}
              icon={theme ? <HeadPlus /> : <HeadPlusDark />}
              theme={theme}
            />
          </Col>
        </Row>
      </Col>
      <Col
        style={{ height: 50 }}
        span={24}
        className={`${
          theme ? Pages.lightWrapperSlider : Pages.darkWrapperSlider
        } md:hidden block px-4 py-2`}
      >
        <GlobalTabSlider
          tab={tab}
          handleChangeTab={handleChangeTab}
          theme={theme}
          globalSettingTranslate={globalSettingTranslate}
        />
      </Col>
      <ContentWrapper theme={theme}>
        <Col className="md:hidden block" span={24}>
          <div className="flex justify-between">
            <div>
              <BreadcrumbItem>
                <Breadcrumb.Item onClick={() => {}}>
                  <Link href="/">
                    <a>
                      <span
                        className={
                          theme
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                        }
                      >
                        {globalSettingTranslate["dashboard"]?.title}
                      </span>
                    </a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightItem
                        : BreadcrumbStyles.darkItem
                    }
                  >
                    {globalSettingTranslate["global-setting"]?.title}
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => {}}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightLast
                        : BreadcrumbStyles.darkLast
                    }
                  >
                    {globalSettingTranslate["accesses"]?.title}
                  </span>
                </Breadcrumb.Item>
              </BreadcrumbItem>
            </div>
            <div className="flex items-center">
              <HeadPlusButton onClick={handleOpenRoleModal} theme={theme} />
            </div>
          </div>
        </Col>

        <Col className="md:px-2 md:pt-2 pt-4" span={24}>
          <Row className="wrapper-notif">
            {role.map((item, index) => {
              return (
                <Col span={24} className="pb-1.5 w-full notif-item" key={index}>
                  <RoleItem
                    handleChangeTab={handleChangeTab}
                    router={router}
                    globalSettingTranslate={globalSettingTranslate}
                    handleChangeRouteRole={() => handleChangeRouteRole(item.id)}
                    handleGetPermissionList={() =>
                      handleGetPermissionList(item.id)
                    }
                    handleSetDefaultRole={() => handleSetDefaultRole(item.id)}
                    data={item}
                    isDefaultRole={item?.isDefault}
                    handleOpenRoleModalEdit={() =>
                      handleOpenRoleModalEdit(item.id, item.title)
                    }
                    handleDeleteRole={() => handleDeleteRole(item.id)}
                    theme={theme}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </ContentWrapper>
    </Row>
  ) : (
    <Empty description={false} />
  );
}
