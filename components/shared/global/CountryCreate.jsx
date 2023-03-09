import React from "react";
import { Button, Col, Row, Upload } from "antd";
import Create from "/public/assets/images/svgs/social-create.svg";
import CreateDark from "/public/assets/images/svgs/dark/social-create.svg";
import UploadIcon from "/public/assets/images/svgs/upload-social.svg";
import Styles from "/styles/scss/dashboard/SocialCreate.module.scss";
import FormItem from "../form/FormItem";
import TextItem from "../form/TextItem";
import CustomeButton from "../CustomeButton";
import { isEmpty } from "lodash";
import Error from "../Error";
export default function CountryCreate({
  theme,
  setCountryInputs,
  countryInputs,
  handleCreateCountry,
  errors,
  isUpdatedCountry,
  handleUpdateCountry,
  globalSettingTranslate,
}) {
  return (
    <Row>
      <Col span={24}>
        <div className="flex justify-between">
          <div className="flex items-center">
            <span>{theme ? <Create /> : <CreateDark />}</span>
            <span className={theme ? Styles.lightLabel : Styles.darkLabel}>
              {globalSettingTranslate["add-new-country"]?.title}
            </span>
          </div>
          <div>
            <Upload
              showUploadList={false}
              onChange={({ file }) =>
                setCountryInputs((prev) => {
                  return { ...prev, flag: file.originFileObj };
                })
              }
            >
              <Button
                className={theme ? Styles.lightButton : Styles.darkButton}
              >
                {globalSettingTranslate["upload-flag"]?.title}
                <span className="pl-2">
                  <UploadIcon />
                </span>
              </Button>
            </Upload>
            {!isEmpty(errors?.flag) ? <Error text={errors.flag} /> : null}
          </div>
        </div>
      </Col>
      <Col span={24} className="mt-5">
        <FormItem>
          <Row>
            <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
              <TextItem
                isWrong={!isEmpty(errors?.name) ? true : false}
                help={errors?.name}
                value={countryInputs.name}
                onChange={setCountryInputs}
                theme={theme}
                label={globalSettingTranslate["name"]?.title}
                name="name"
              />
            </Col>
            <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
              <TextItem
                isWrong={!isEmpty(errors?.code) ? true : false}
                help={errors?.code}
                value={countryInputs.code}
                onChange={setCountryInputs}
                theme={theme}
                label={globalSettingTranslate["code"]?.title}
                name="code"
              />
            </Col>
            <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
              <TextItem
                isWrong={!isEmpty(errors?.prefix) ? true : false}
                help={errors?.prefix}
                value={countryInputs.prefix}
                onChange={setCountryInputs}
                theme={theme}
                label={globalSettingTranslate["prefix"]?.title}
                name="prefix"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} className="flex justify-end mt-10">
              <CustomeButton
                onClick={
                  isUpdatedCountry ? handleUpdateCountry : handleCreateCountry
                }
                styles={{
                  color: "#FFFFFF",
                  backgroundColor: "#3869FF",
                }}
                text={
                  isUpdatedCountry
                    ? globalSettingTranslate["update"]?.title
                    : globalSettingTranslate["save"]?.title
                }
              />
            </Col>
          </Row>
        </FormItem>
      </Col>
    </Row>
  );
}
