import React from "react";
import { Button, Modal, Col, Row, Upload } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Styles from "/styles/scss/dashboard/SocialCreate.module.scss";
import DividerItem from "../DividerItem";
import UploadIcon from "/public/assets/images/svgs/upload-social.svg";
import FormItem from "../form/FormItem";
import TextItem from "../form/TextItem";
import { isEmpty } from "lodash";
import CustomeButton from "../CustomeButton";
export default function SocialModal({
  visible,
  handleClose,
  theme,
  globalSettingTranslate,
  setSocialsInputs,
  socialsInputs,
  errors,
  isUpdatedSocial,
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
      <Row className="md:mx-10 mx-0 py-5 md:px-10 px-2">
        <Col span={12}>
          <DividerItem
            theme={theme}
            content={globalSettingTranslate["add-new-social"]?.title}
          />
        </Col>
        <Col span={12}>
          <div className="flex justify-end pt-0.5">
            <Upload
              showUploadList={false}
              onChange={({ file }) =>
                setSocialsInputs((prev) => {
                  return { ...prev, icon: file.originFileObj };
                })
              }
            >
              <Button
                className={theme ? Styles.lightButton : Styles.darkButton}
              >
                {globalSettingTranslate["upload-icon"]?.title}
                <span className="pl-2">
                  <UploadIcon />
                </span>
              </Button>
            </Upload>
          </div>
        </Col>{" "}
        <Col span={24} className="md:mt-10 mt-4">
          <FormItem>
            <Row>
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <TextItem
                  isWrong={!isEmpty(errors?.title) ? true : false}
                  help={errors?.title}
                  value={socialsInputs.title}
                  onChange={setSocialsInputs}
                  theme={theme}
                  label={globalSettingTranslate["label"]?.title}
                  name="title"
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
                <TextItem
                  isWrong={!isEmpty(errors?.website) ? true : false}
                  help={errors?.website}
                  value={socialsInputs.website}
                  onChange={setSocialsInputs}
                  theme={theme}
                  label={globalSettingTranslate["link"]?.title}
                  name="website"
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className="flex justify-end mt-10">
                <CustomeButton
                  onClick={onFinish}
                  styles={{
                    color: "#FFFFFF",
                    backgroundColor: "#3869FF",
                  }}
                  text={
                    isUpdatedSocial
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
