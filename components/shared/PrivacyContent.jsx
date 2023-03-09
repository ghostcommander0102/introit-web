import React from "react";
import { Col, Row } from "antd";
import FormItem from "./form/FormItem";
import SaveButton from "./SaveButton";
import Styles from "/styles/scss/dashboard/NotifContent.module.scss";
import PrivacyItem from "./PrivacyItem";
export default function PrivacyContent({
  theme,
  privacyInputs,
  onPrivacyChange,
  setPrivacyActive,
  mySettingsTranslate,
}) {
  return (
    <FormItem>
      <Row className="md:px-2 pt-2">
        <Col className="wrapper-privacy" span={24}>
          <PrivacyItem
            setPrivacyActive={setPrivacyActive}
            onChange={() =>
              onPrivacyChange(
                "showResumeToEmployers",
                !privacyInputs?.showResumeToEmployers
              )
            }
            value={privacyInputs?.showResumeToEmployers}
            text={mySettingsTranslate["show-your-resume-to-employers"]?.title}
            theme={theme}
          />
          <PrivacyItem
            setPrivacyActive={setPrivacyActive}
            onChange={() =>
              onPrivacyChange(
                "isProfilePublic",
                !privacyInputs?.isProfilePublic
              )
            }
            value={privacyInputs?.isProfilePublic}
            text={mySettingsTranslate["public-profile"]?.title}
            theme={theme}
          />
          <PrivacyItem
            setPrivacyActive={setPrivacyActive}
            onChange={() =>
              onPrivacyChange("yourSessions", !privacyInputs?.yourSessions)
            }
            value={privacyInputs?.yourSessions}
            text={mySettingsTranslate["your-sessions"]?.title}
            theme={theme}
          />
        </Col>
        <Col span={24} className="mt-10 pt-10 flex justify-end">
          <SaveButton
            theme={theme}
            leftText={mySettingsTranslate["cancel"]?.title}
            rightText={mySettingsTranslate["save"]?.title}
          />
        </Col>
      </Row>
    </FormItem>
  );
}
