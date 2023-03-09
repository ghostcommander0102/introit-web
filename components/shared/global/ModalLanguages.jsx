import React from "react";
import { Button, Col, Modal, Row, Upload } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Styles from "/styles/scss/dashboard/SocialCreate.module.scss";
import UploadIcon from "/public/assets/images/svgs/upload-social.svg";
import FormItem from "../form/FormItem";
import TextItem from "../form/TextItem";
import CustomeButton from "../CustomeButton";
import { isEmpty } from "lodash";
import Error from "../Error";
import DividerItem from "../DividerItem";
import SelectItem from "../form/SelectItem";
export default function ModalLanguages({
  visible,
  handleClose,
  theme,
  setLanguagesInputs,
  languagesInputs,
  errors,
  isUpdatedCountry,
  globalSettingTranslate = {},
  onFinish,
}) {
  return (
    <Modal
      footer={false}
      closable={false}
      visible={visible}
      centered={true}
      width={900}
    >
      <div className="md:block hidden">
        <Button
          onClick={handleClose}
          className={theme ? ModalStyles.lightClose : ModalStyles.darkClose}
        >
          <Close />
        </Button>
      </div>
      <div className="md:hidden block">
        <Button onClick={handleClose} className={ModalStyles.mobileClose}>
          <Close />
        </Button>
      </div>
      <Row className="mt-5 md:px-10 px-2">
        <Col span={24}>
          <div className="flex justify-between">
            <div className="flex items-center">
              <DividerItem
                theme={theme}
                content={globalSettingTranslate["add-new-languages"]?.title}
              />
            </div>
          </div>
        </Col>
        <Col span={24} className="mt-5">
          <FormItem>
            <Row>
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <TextItem
                  isWrong={
                    !isEmpty(errors?.title || errors?.title) ? true : false
                  }
                  help={errors?.title || errors?.title}
                  value={languagesInputs.title}
                  onChange={setLanguagesInputs}
                  theme={theme}
                  label={globalSettingTranslate["title"]?.title}
                  name="title"
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
                <TextItem
                  isWrong={!isEmpty(errors?.code) ? true : false}
                  help={errors?.code}
                  value={languagesInputs.code}
                  onChange={setLanguagesInputs}
                  theme={theme}
                  label={globalSettingTranslate["language-code"]?.title}
                  name="code"
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <SelectItem
                  isWrong={!isEmpty(errors?.isRtl) ? true : false}
                  help={errors?.isRtl}
                  defaultValue={
                    !isEmpty(languagesInputs) ? languagesInputs?.isRtl : null
                  }
                  name="isRtl"
                  theme={theme}
                  placeholder=""
                  options={[
                    { label: "Rtl", value: true },
                    { label: "Ltr", value: false },
                  ]}
                  label={globalSettingTranslate["direction"]?.title}
                  onChange={(value) => {
                    setLanguagesInputs((prev) => {
                      return { ...prev, isRtl: value };
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className="flex justify-end mt-10">
                <CustomeButton
                  onClick={onFinish}
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
    </Modal>
  );
}
