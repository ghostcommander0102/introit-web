import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import TranslateContent from "./TranslateContent";
import TranslateItem from "./TranslateItem";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Pages from "/styles/scss/common/Pages.module.scss";
import Link from "next/link";
import HeadButton from "./HeadButton";
import HeadPlus from "/public/assets/images/svgs/plus-head.svg";
import HeadPlusDark from "/public/assets/images/svgs/dark/plus-head.svg";
import HeadPlusButton from "./HeadPlusButton";
import ContentWrapper from "./ContentWrapper";
import GlobalTabSlider from "./global/GlobalTabSlider";
export default function TransalteList({
  languageTranslateList,
  setTranslateSetting,
  translateSetting,
  translateSection,
  translateInputs,
  setTranslateInputs,
  handleTranslate,
  theme,
  globalSettingTranslate,
  handleCloseTranslate,
  errors,
  handleChangeTab,
  translateIsCraete,
  setTranslateIsCreate,
  setTranslateTarget,
  translateTarget,
  handleLiveLanguage,
  handleDeletTranslate,
  handleShowModalVisible,
  tab,
}) {
  if (!translateIsCraete) {
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
                    {globalSettingTranslate["translation"]?.title}
                  </span>
                </Breadcrumb.Item>
              </BreadcrumbItem>
            </Col>
            <Col span={12}>
              <div className="flex justify-end">
                <HeadButton
                  inGlobal={true}
                  onClick={handleShowModalVisible}
                  theme={theme}
                  text={globalSettingTranslate["add-new-languages"]?.title}
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
          <Row className="md:px-2 md:pt-2 ">
            <Col span={12} className="pb-4 md:hidden block">
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
                      {globalSettingTranslate["translation"]?.title}
                    </span>
                  </Breadcrumb.Item>
                </BreadcrumbItem>
              </div>
            </Col>
            <Col span={12} className="md:hidden block">
              <div className="flex justify-end">
                <HeadPlusButton
                  onClick={handleShowModalVisible}
                  theme={theme}
                />
              </div>
            </Col>
            <Col span={24}>
              <Row className="wrapper-translation">
                {languageTranslateList?.map((item, index) => {
                  return (
                    <Col
                      className="pb-1.5 translation-item"
                      span={24}
                      key={index}
                    >
                      <TranslateItem
                        globalSettingTranslate={globalSettingTranslate}
                        handleDeletTranslate={() =>
                          handleDeletTranslate(item?.id)
                        }
                        handleLiveLanguage={() => handleLiveLanguage(item?.id)}
                        theme={theme}
                        setTranslateTarget={setTranslateTarget}
                        setTranslateIsCreate={setTranslateIsCreate}
                        data={item}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </ContentWrapper>
      </Row>
    );
  } else {
    return (
      <TranslateContent
        handleChangeTab={handleChangeTab}
        setTranslateIsCreate={setTranslateIsCreate}
        translateTarget={translateTarget}
        languageTranslateList={languageTranslateList}
        setTranslateSetting={setTranslateSetting}
        translateSetting={translateSetting}
        translateSection={translateSection}
        translateInputs={translateInputs}
        setTranslateInputs={setTranslateInputs}
        handleTranslate={handleTranslate}
        theme={theme}
        globalSettingTranslate={globalSettingTranslate}
        handleCloseTranslate={handleCloseTranslate}
        errors={errors}
        tab={tab}
      />
    );
  }
}
