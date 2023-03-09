import React from "react";
import { Col, Row } from "antd";
import FormItem from "./form/FormItem";
import Styles from "/styles/scss/dashboard/NotifContent.module.scss";
import NotifItem from "./NotifItem";
export default function NotifContent({
  theme,
  notifInputs,
  setNotifActive,
  onNotifChange,
  mySettingsTranslate,
}) {
  return (
    <FormItem>
      <Row className="md:px-2 md:pt-2">
        <Col span={24} className="mb-2">
          <div className="md:flex hidden md:px-10 px-2 md:py-0 py-3">
            <div className="w-1/2"></div>
            <div className="w-1/2">
              <div className="flex  justify-between">
                <div>
                  <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
                    {mySettingsTranslate["in-dashboard"]?.title}
                  </p>
                </div>
                <div>
                  <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
                    {mySettingsTranslate["via-email"]?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`md:hidden flex md:px-10 md:mx-2 mt-4 ${
              theme ? Styles.lightWrapperMobile : Styles.darkWrapperMobile
            }`}
          >
            <div className="w-1/2"></div>
            <div className="w-1/2">
              <div className="flex  justify-between">
                <div>
                  <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
                    {mySettingsTranslate["in-dashboard"]?.title}
                  </p>
                </div>
                <div>
                  <p className={theme ? Styles.lightTitle : Styles.darkTitle}>
                    {mySettingsTranslate["via-email"]?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Row className="wrapper-notif">
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange("jobOffersInDash", !notifInputs?.jobOffersInDash)
              }
              onEmailChange={() =>
                onNotifChange(
                  "jobOffersInEmail",
                  !notifInputs?.jobOffersInEmail
                )
              }
              inDash={notifInputs?.jobOffersInDash}
              InEmail={notifInputs?.jobOffersInEmail}
              theme={theme}
              title={mySettingsTranslate["job-offers"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange("applyJobInDash", !notifInputs?.applyJobInDash)
              }
              onEmailChange={() =>
                onNotifChange("applyJobInEmail", !notifInputs?.applyJobInEmail)
              }
              inDash={notifInputs?.applyJobInDash}
              InEmail={notifInputs?.applyJobInEmail}
              theme={theme}
              title={mySettingsTranslate["apply-job"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "projectInvitationInDash",
                  !notifInputs?.projectInvitationInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "projectInvitationInEmail",
                  !notifInputs?.projectInvitationInEmail
                )
              }
              inDash={notifInputs?.projectInvitationInDash}
              InEmail={notifInputs?.projectInvitationInEmail}
              theme={theme}
              title={mySettingsTranslate["project-invitation"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "appliedJobsStatusInDash",
                  !notifInputs?.appliedJobsStatusInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "appliedJobsStatusInEmail",
                  !notifInputs?.appliedJobsStatusInEmail
                )
              }
              inDash={notifInputs?.appliedJobsStatusInDash}
              InEmail={notifInputs?.appliedJobsStatusInEmail}
              theme={theme}
              title={mySettingsTranslate["applied-jobs-status"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "fieldOfStudyAdsInDash",
                  !notifInputs?.fieldOfStudyAdsInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "fieldOfStudyAdsInDash",
                  !notifInputs?.fieldOfStudyAdsInDash
                )
              }
              inDash={notifInputs?.fieldOfStudyAdsInDash}
              InEmail={notifInputs?.fieldOfStudyAdsInEmail}
              theme={theme}
              title={mySettingsTranslate["field-of-study-ads"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "resumeViewInDash",
                  !notifInputs?.resumeViewInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "resumeViewInEmail",
                  !notifInputs?.resumeViewInEmail
                )
              }
              inDash={notifInputs?.resumeViewInDash}
              InEmail={notifInputs?.resumeViewInEmail}
              theme={theme}
              title={mySettingsTranslate["resume-view"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "passwordChangeInDash",
                  !notifInputs?.passwordChangeInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "passwordChangeInEmail",
                  !notifInputs?.passwordChangeInEmail
                )
              }
              inDash={notifInputs?.passwordChangeInDash}
              InEmail={notifInputs?.passwordChangeInEmail}
              theme={theme}
              title={mySettingsTranslate["password-change"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "newConnectionInDash",
                  !notifInputs?.newConnectionInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "newConnectionInEmail",
                  !notifInputs?.newConnectionInEmail
                )
              }
              inDash={notifInputs?.newConnectionInDash}
              InEmail={notifInputs?.newConnectionInEmail}
              theme={theme}
              title={mySettingsTranslate["new-connection"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "blogContentInDash",
                  !notifInputs?.blogContentInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "blogContentInEmail",
                  !notifInputs?.blogContentInEmail
                )
              }
              inDash={notifInputs?.blogContentInDash}
              InEmail={notifInputs?.blogContentInEmail}
              theme={theme}
              title={mySettingsTranslate["blog-content"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange(
                  "courseSuggestionsInDash",
                  !notifInputs?.courseSuggestionsInDash
                )
              }
              onEmailChange={() =>
                onNotifChange(
                  "courseSuggestionsInEmail",
                  !notifInputs?.courseSuggestionsInEmail
                )
              }
              inDash={notifInputs?.courseSuggestionsInDash}
              InEmail={notifInputs?.courseSuggestionsInEmail}
              theme={theme}
              title={mySettingsTranslate["course-suggestions"]?.title}
            />
            <NotifItem
              setNotifActive={setNotifActive}
              onDashChange={() =>
                onNotifChange("discountsInDash", !notifInputs?.discountsInDash)
              }
              onEmailChange={() =>
                onNotifChange(
                  "discountsInEmail",
                  !notifInputs?.discountsInEmail
                )
              }
              inDash={notifInputs?.discountsInDash}
              InEmail={notifInputs?.discountsInEmail}
              theme={theme}
              title={mySettingsTranslate["discounts"]?.title}
            />
          </Row>
        </Col>
      </Row>
    </FormItem>
  );
}
