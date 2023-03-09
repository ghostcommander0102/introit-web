import React from "react";
import { Breadcrumb, Col, Row } from "antd";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Pages from "/styles/scss/common/Pages.module.scss";
import BreadcrumbItem from "../BreadcrumbItem";
import Link from "next/link";
import HeadPlusButton from "../HeadPlusButton";
import ContentWrapper from "../ContentWrapper";
import GlobalTabSlider from "./GlobalTabSlider";
import BuilderButton from "./BuilderButtons";
import Menu from "./Menu";
export default function MenuBuilderContent({
  theme,
  globalSettingTranslate,
  handleOpenRoleModal,
  handleChangeTab,
  tab,
}) {
  return (
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
                      ? BreadcrumbStyles.lightItem
                      : BreadcrumbStyles.darkItem
                  }
                >
                  {globalSettingTranslate["accesses"]?.title}
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
                  {globalSettingTranslate["menu-builder"]?.title}
                </span>
              </Breadcrumb.Item>
            </BreadcrumbItem>
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
          </div>
        </Col>
        <Col className="md:px-2 md:pt-2 pt-4" span={24}>
          <Row>
            <Col span={24}>
              <BuilderButton theme={theme} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Menu />
            </Col>
          </Row>
        </Col>
      </ContentWrapper>
    </Row>
  );
}
