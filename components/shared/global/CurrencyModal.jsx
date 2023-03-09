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
export default function CurrencyModal({
  visible,
  handleClose,
  theme,
  setCurrencyInputs,
  currnecyInputs = {},
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
                content={globalSettingTranslate["add-new-currency"]?.title}
              />
            </div>
            <div>
              <Upload
                showUploadList={false}
                onChange={({ file }) =>
                  setCurrencyInputs((prev) => {
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
                  isWrong={
                    !isEmpty(errors?.name || errors?.name) ? true : false
                  }
                  help={errors?.name || errors?.name}
                  value={currnecyInputs.name}
                  onChange={setCurrencyInputs}
                  theme={theme}
                  label={globalSettingTranslate["name"]?.title}
                  name="name"
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pl-2.5 pl-0">
                <TextItem
                  isWrong={!isEmpty(errors?.code) ? true : false}
                  help={errors?.code}
                  value={currnecyInputs.code}
                  onChange={setCurrencyInputs}
                  theme={theme}
                  label={globalSettingTranslate["code"]?.title}
                  name="code"
                />
              </Col>
              <Col md={{ span: 12 }} span={24} className="md:pr-2.5 pr-0">
                <TextItem
                  isWrong={!isEmpty(errors?.symbol) ? true : false}
                  help={errors?.symbol}
                  value={currnecyInputs.symbol}
                  onChange={setCurrencyInputs}
                  theme={theme}
                  label={globalSettingTranslate["symbol"]?.title}
                  name="symbol"
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
