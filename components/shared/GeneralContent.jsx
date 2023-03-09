import React from "react";
import { Col, Row } from "antd";
import SelectItem from "./form/SelectItem";
import FormItem from "./form/FormItem";
import { isEmpty } from "lodash";
export default function GeneralContent({
  theme,
  timeZone,
  setTimeZoneInputs,
  currnecy,
  setCurrnecyInputs,
  languagesList,
  setLanguageInputs,
  currentUser,
  mySettingsTranslate,
  setThemeInputs,
  themeInputs,
  timeZoneInputs,
  currnecyInputs,
}) {
  return (
    <FormItem>
      <Row className="md:px-2 md:py-2">
        <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
          <SelectItem
            onChange={(item) => {
              setTimeZoneInputs((prev) => {
                return { ...prev, timezoneId: item };
              });
            }}
            defaultValue={timeZoneInputs?.timezoneId}
            options={timeZone}
            theme={theme}
            placeholder=""
            label={mySettingsTranslate["time-zone"]?.title}
          />
        </Col>
        <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
          <SelectItem
            onChange={(currnecy) => {
              setCurrnecyInputs((prev) => {
                return { ...prev, currencyId: currnecy };
              });
            }}
            defaultValue={currnecyInputs?.currencyId}
            options={currnecy}
            theme={theme}
            label={mySettingsTranslate["currency"]?.title}
          />
        </Col>
        <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
          <SelectItem
            onChange={(language) => {
              setLanguageInputs((prev) => {
                return { ...prev, languageId: language };
              });
            }}
            defaultValue={
              !isEmpty(currentUser) ? currentUser?.language?.id : null
            }
            options={languagesList}
            theme={theme}
            label={mySettingsTranslate["language"]?.title}
          />
        </Col>
        <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
          <SelectItem
            onChange={(theme) => {
              setThemeInputs((prev) => {
                return { ...prev, themeId: theme };
              });
            }}
            defaultValue={themeInputs?.themeId}
            options={[
              { label: mySettingsTranslate["dark"]?.title, value: 1 },
              { label: mySettingsTranslate["light"]?.title, value: 2 },
              { label: mySettingsTranslate["system"]?.title, value: 3 },
            ]}
            theme={theme}
            label={mySettingsTranslate["theme"]?.title}
          />
        </Col>
      </Row>
    </FormItem>
  );
}
