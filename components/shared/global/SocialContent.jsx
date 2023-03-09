import React from "react";
import { Breadcrumb, Button, Col, Row } from "antd";
import { isEmpty } from "lodash";
import SocialItem from "./SocialItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Pages from "/styles/scss/common/Pages.module.scss";
import BreadcrumbItem from "../BreadcrumbItem";
import Link from "next/link";
import HeadButton from "../HeadButton";
import HeadPlus from "/public/assets/images/svgs/plus-head.svg";
import HeadPlusDark from "/public/assets/images/svgs/dark/plus-head.svg";
import HeadPlusButton from "../HeadPlusButton";
import ContentWrapper from "../ContentWrapper";
import GlobalTabSlider from "./GlobalTabSlider";
export default function SettingSocialContent({
  theme,
  socials,
  handleDeleteSocial,
  handleShowSocial,
  globalSettingTranslate,
  handleShowCreateModal,
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
                      ? BreadcrumbStyles.lightLast
                      : BreadcrumbStyles.darkLast
                  }
                >
                  {globalSettingTranslate["social-media"]?.title}
                </span>
              </Breadcrumb.Item>
            </BreadcrumbItem>
          </Col>
          <Col span={12}>
            <div className="flex justify-end">
              <HeadButton
                inGlobal={true}
                onClick={handleShowCreateModal}
                theme={theme}
                text={globalSettingTranslate["add-new-social"]?.title}
                icon={theme ? <HeadPlus /> : <HeadPlusDark />}
              />
            </div>
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
        <Col span={24} className="pb-4 md:hidden block">
          <div className="flex justify-between items-center w-full">
            <div className="wrapper-bread">
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
                <Breadcrumb.Item onClick={() => {}}>
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
                    {globalSettingTranslate["social-media"]?.title}
                  </span>
                </Breadcrumb.Item>
              </BreadcrumbItem>
            </div>
            <div className="flex items-center">
              <HeadPlusButton onClick={handleShowCreateModal} theme={theme} />
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Row className="md:px-2 md:pt-2">
            <Col span={24} className="wrapper-social">
              {!isEmpty(socials)
                ? socials.map((item, index) => {
                    return (
                      <SocialItem
                        key={index}
                        translator={globalSettingTranslate}
                        handleDeleteSocial={() => handleDeleteSocial(item.id)}
                        handleShowSocial={() => handleShowSocial(item.id)}
                        data={item}
                        theme={theme}
                      />
                    );
                  })
                : null}
            </Col>
          </Row>
        </Col>
      </ContentWrapper>
    </Row>
  );
}
