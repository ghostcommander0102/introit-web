import { Breadcrumb, Col, Empty, Row } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import BreadcrumbItem from "./BreadcrumbItem";
import DividerItem from "./DividerItem";
import FormItem from "./form/FormItem";
import SelectItem from "./form/SelectItem";
import TextItem from "./form/TextItem";
import TranslateText from "./form/TranslateText";
import SaveButton from "./SaveButton";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Styles from "/styles/scss/common/Pages.module.scss";
import Link from "next/link";
import ContentWrapper from "./ContentWrapper";
import GlobalTabSlider from "./global/GlobalTabSlider";
export default function TranslateContent({
  theme,
  globalSettingTranslate,
  languageTranslateList,
  setTranslateSetting,
  translateSetting,
  translateSection,
  translateInputs,
  setTranslateInputs,
  handleTranslate,
  errors,
  setTranslateIsCreate,
  handleChangeTab,
  tab,
}) {
  return (
    <>
      <Row>
        <Col style={{ height: 52 }} className="p-4 md:block hidden" span={24}>
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
                  theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
                }
              >
                {globalSettingTranslate["global-setting"]?.title}
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => setTranslateIsCreate(false)}>
              <span
                className={
                  theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
                }
              >
                {globalSettingTranslate["translation"]?.title}
              </span>
            </Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => {}}>
              <span
                className={
                  theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
                }
              >
                {globalSettingTranslate["translate"]?.title}
              </span>
            </Breadcrumb.Item>
          </BreadcrumbItem>
        </Col>
        <Col
          style={{ height: 50 }}
          span={24}
          className={`${
            theme ? Styles.lightWrapperSlider : Styles.darkWrapperSlider
          } md:hidden block px-4 py-2`}
        >
          <GlobalTabSlider
            tab={tab}
            handleChangeTab={handleChangeTab}
            theme={theme}
            globalSettingTranslate={globalSettingTranslate}
          />
        </Col>
      </Row>
      <ContentWrapper theme={theme}>
        <Row className="md:px-2 md:pt-2">
          <Col span={24} className="pb-4 md:hidden block">
            <div className="wrapper-bread-setting">
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
                <Breadcrumb.Item onClick={() => setTranslateIsCreate(false)}>
                  <span
                    className={
                      theme
                        ? BreadcrumbStyles.lightItem
                        : BreadcrumbStyles.darkItem
                    }
                  >
                    {globalSettingTranslate["translation"]?.title}
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
                    {globalSettingTranslate["translate"]?.title}
                  </span>
                </Breadcrumb.Item>
              </BreadcrumbItem>
            </div>
          </Col>
          <Col style={{ zIndex: 34 }} span={24}>
            <FormItem>
              <Row>
                <Col className="md:pr-2.5 pr-0" md={{ span: 8 }} span={24}>
                  <SelectItem
                    inAdmin={false}
                    isWrong={!isEmpty(errors?.languageId) ? true : false}
                    help={errors?.languageId}
                    onChange={(value, object) => {
                      setTranslateSetting((prev) => {
                        return {
                          ...prev,
                          transalteTo: value,
                          transalteName: object?.children,
                        };
                      });
                    }}
                    defaultValue={
                      !isEmpty(translateSetting)
                        ? translateSetting?.transalteTo
                        : null
                    }
                    options={languageTranslateList}
                    theme={theme}
                    label={globalSettingTranslate["translate-to"]?.title}
                    placeholder=""
                  />
                </Col>
                <Col className="md:pr-2.5 pr-0" md={{ span: 8 }} span={24}>
                  <SelectItem
                    inAdmin={false}
                    onChange={(value) => {
                      setTranslateSetting((prev) => {
                        return { ...prev, category: value };
                      });
                    }}
                    defaultValue={
                      !isEmpty(translateSetting)
                        ? translateSetting?.category
                        : null
                    }
                    options={[
                      { label: "Basic", value: "basic" },
                      { label: "Site", value: "site" },
                      { label: "App", value: "app" },
                    ]}
                    theme={theme}
                    label={globalSettingTranslate["category"]?.title}
                    placeholder=""
                  />
                </Col>
                <Col className="md:pr-2.5 pr-0" md={{ span: 8 }} span={24}>
                  <SelectItem
                    inAdmin={false}
                    isWrong={!isEmpty(errors?.sectionId) ? true : false}
                    help={errors?.sectionId}
                    onChange={(value, object) => {
                      setTranslateSetting((prev) => {
                        return {
                          ...prev,
                          section: value,
                          sectionName: object?.children,
                        };
                      });
                    }}
                    defaultValue={
                      !isEmpty(translateSetting)
                        ? translateSetting?.section
                        : null
                    }
                    options={translateSection}
                    theme={theme}
                    label={globalSettingTranslate["section"]?.title}
                    placeholder=""
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col span={24}>
                  <DividerItem
                    theme={theme}
                    content={translateSetting?.sectionName}
                  />
                </Col>
              </Row>
              <Row className="mt-5">
                <Col span={24}>
                  <Row>
                    <Col span={12}>
                      <p className={theme ? Styles.lightText : Styles.darkText}>
                        {!isEmpty(translateInputs) ? "English" : null}
                      </p>
                    </Col>
                    <Col span={12}>
                      <p className={theme ? Styles.lightText : Styles.darkText}>
                        {!isEmpty(translateInputs)
                          ? translateSetting?.transalteName
                          : null}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {!isEmpty(translateInputs) ? (
                translateInputs?.map((item, index) => {
                  return (
                    <Row key={index}>
                      <Col span={12} className="pr-2.5 mb-4">
                        <TextItem
                          value={item?.title}
                          disabled={true}
                          theme={theme}
                        />
                      </Col>
                      <Col span={12} className="pl-2.5 pt-2">
                        <TranslateText
                          onChange={(e) => {
                            const array = [...translateInputs];
                            const itemIndex = array.findIndex(
                              (t) => t?.id == item?.id
                            );
                            const target = array[itemIndex];
                            target.translation = e.target.value;
                            setTranslateInputs(array);
                          }}
                          placeholder="..."
                          value={item?.translation}
                          theme={theme}
                        />
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <Empty description="" />
              )}
              <Row className="my-10">
                <Col span={24} className="flex justify-end">
                  <SaveButton
                    onClick={handleTranslate}
                    text={globalSettingTranslate["save"]?.title}
                    theme={theme}
                  />
                </Col>
              </Row>
            </FormItem>
          </Col>
        </Row>
      </ContentWrapper>
    </>
  );
}
