import React from "react";
import { Breadcrumb, Col, Row } from "antd";
import BreadcrumbItem from "./BreadcrumbItem";
import ContentWrapper from "./ContentWrapper";
import GeneralContent from "./GeneralContent";
import NotifContent from "./NotifContent";
import PrivacyContent from "./PrivacyContent";
import AccountManagement from "./AccountManagement";
import SettingsTabSlider from "./SettingsTabSlider";
import BreadcrumbStyles from "/styles/scss/dashboard/Breadcrumb.module.scss";
import Styles from "/styles/scss/common/Pages.module.scss";
export default function SettingsContent({
  theme,
  tab,
  handleChangeTab,
  handleChangeTabAccount,
  accountTab,
  currentUser,
  timeZone,
  setTimeZoneInputs,
  timeZoneInputs,
  currnecy,
  setCurrnecyInputs,
  currnecyInputs,
  languagesList,
  setLanguageInputs,
  languageInputs,
  notifInputs,
  setNotifActive,
  onNotifChange,
  privacyInputs,
  onPrivacyChange,
  setPrivacyActive,
  handleDeActiveAccount,
  handleAccountDelete,
  router,
  mySettingsTranslate,
  setThemeInputs,
  themeInputs,
  setAccountTab,
}) {
  console.log("mySettingsTranslate", mySettingsTranslate);
  return (
    <Row>
      <Col style={{ height: 52 }} className="p-4 md:block hidden" span={24}>
        <BreadcrumbItem>
          <Breadcrumb.Item onClick={() => router.push("/")}>
            <span
              className={
                theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
              }
            >
              {mySettingsTranslate["dashboard"]?.title}
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
            <span
              className={
                theme ? BreadcrumbStyles.lightItem : BreadcrumbStyles.darkItem
              }
            >
              {mySettingsTranslate["settings"]?.title}
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span
              className={
                accountTab == 2 || accountTab == 3
                  ? theme
                    ? BreadcrumbStyles.lightItem
                    : BreadcrumbStyles.darkItem
                  : theme
                  ? BreadcrumbStyles.lightLast
                  : BreadcrumbStyles.darkLast
              }
              onClick={
                accountTab == 2 || accountTab == 3
                  ? () => setAccountTab(0)
                  : () => {}
              }
            >
              {tab == 1
                ? mySettingsTranslate["general"]?.title
                : tab == 2
                ? mySettingsTranslate["notifications"]?.title
                : tab == 3
                ? mySettingsTranslate["privacy"]?.title
                : tab == 4
                ? mySettingsTranslate["account-management"]?.title
                : null}
            </span>
          </Breadcrumb.Item>
          {accountTab == 2 ? (
            <Breadcrumb.Item>
              <span
                className={
                  theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
                }
              >
                {mySettingsTranslate["temporarily-deactivation"]?.title}
              </span>
            </Breadcrumb.Item>
          ) : accountTab == 3 ? (
            <Breadcrumb.Item>
              <span
                className={
                  theme ? BreadcrumbStyles.lightLast : BreadcrumbStyles.darkLast
                }
              >
                {mySettingsTranslate["delete-account"]?.title}
              </span>
            </Breadcrumb.Item>
          ) : null}
        </BreadcrumbItem>
      </Col>
      {/* start mobile */}
      <Col
        span={24}
        className={`${
          theme ? Styles.lightWrapperSlider : Styles.darkWrapperSlider
        } md:hidden block px-4 py-2`}
      >
        <SettingsTabSlider
          mySettingsTranslate={mySettingsTranslate}
          theme={theme}
          tab={tab}
          handleChangeTab={handleChangeTab}
        />
      </Col>

      {/* end mobile */}
      <Col span={24}>
        <Row>
          <Col span={24}>
            <ContentWrapper theme={theme}>
              <div className="md:hidden wrapper-bread-setting block pb-2">
                <BreadcrumbItem>
                  <Breadcrumb.Item onClick={() => router.push("/")}>
                    <span
                      className={
                        theme
                          ? BreadcrumbStyles.lightItem
                          : BreadcrumbStyles.darkItem
                      }
                    >
                      {mySettingsTranslate["dashboard"]?.title}
                    </span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item onClick={() => handleChangeTab(1)}>
                    <span
                      className={
                        theme
                          ? BreadcrumbStyles.lightItem
                          : BreadcrumbStyles.darkItem
                      }
                    >
                      {mySettingsTranslate["settings"]?.title}
                    </span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span
                      className={
                        accountTab == 2 || accountTab == 3
                          ? theme
                            ? BreadcrumbStyles.lightItem
                            : BreadcrumbStyles.darkItem
                          : theme
                          ? BreadcrumbStyles.lightLast
                          : BreadcrumbStyles.darkLast
                      }
                      onClick={
                        accountTab == 2 || accountTab == 3
                          ? () => setAccountTab(0)
                          : () => {}
                      }
                    >
                      {tab == 1
                        ? mySettingsTranslate["general"]?.title
                        : tab == 2
                        ? mySettingsTranslate["notifications"]?.title
                        : tab == 3
                        ? mySettingsTranslate["privacy"]?.title
                        : tab == 4
                        ? mySettingsTranslate["account-management"]?.title
                        : null}
                    </span>
                  </Breadcrumb.Item>
                  {accountTab == 2 ? (
                    <Breadcrumb.Item>
                      <span
                        className={
                          theme
                            ? BreadcrumbStyles.lightLast
                            : BreadcrumbStyles.darkLast
                        }
                      >
                        {mySettingsTranslate["temporarily-deactivation"]?.title}
                      </span>
                    </Breadcrumb.Item>
                  ) : accountTab == 3 ? (
                    <Breadcrumb.Item>
                      <span
                        className={
                          theme
                            ? BreadcrumbStyles.lightLast
                            : BreadcrumbStyles.darkLast
                        }
                      >
                        {mySettingsTranslate["delete-account"]?.title}
                      </span>
                    </Breadcrumb.Item>
                  ) : null}
                </BreadcrumbItem>
              </div>
              {tab == 1 ? (
                <GeneralContent
                  mySettingsTranslate={mySettingsTranslate}
                  setTimeZoneInputs={setTimeZoneInputs}
                  currnecyInputs={currnecyInputs}
                  setCurrnecyInputs={setCurrnecyInputs}
                  timeZoneInputs={timeZoneInputs}
                  timeZone={timeZone}
                  currnecy={currnecy}
                  theme={theme}
                  languagesList={languagesList}
                  setLanguageInputs={setLanguageInputs}
                  languageInputs={languageInputs}
                  currentUser={currentUser}
                  setThemeInputs={setThemeInputs}
                  themeInputs={themeInputs}
                />
              ) : tab == 2 ? (
                <NotifContent
                  mySettingsTranslate={mySettingsTranslate}
                  setNotifActive={setNotifActive}
                  notifInputs={notifInputs}
                  onNotifChange={onNotifChange}
                  theme={theme}
                />
              ) : tab == 3 ? (
                <PrivacyContent
                  mySettingsTranslate={mySettingsTranslate}
                  onPrivacyChange={onPrivacyChange}
                  privacyInputs={privacyInputs}
                  theme={theme}
                  setPrivacyActive={setPrivacyActive}
                />
              ) : tab == 4 ? (
                <AccountManagement
                  mySettingsTranslate={mySettingsTranslate}
                  handleDeActiveAccount={handleDeActiveAccount}
                  handleChangeTabAccount={handleChangeTabAccount}
                  accountTab={accountTab}
                  theme={theme}
                  currentUser={currentUser}
                  handleAccountDelete={handleAccountDelete}
                />
              ) : null}
            </ContentWrapper>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
