import React from "react";
import { Button, Col, Modal, Row, Upload } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import FormItem from "../form/FormItem";
import CustomeButton from "../CustomeButton";
import { isEmpty } from "lodash";
import SelectItem from "../form/SelectItem";
export default function TranslationModal({
  visible,
  handleClose,
  theme,
  errors,
  globalSettingTranslate = {},
  onFinish,
  translationId,
  setTranslationId,
  languagesList,
}) {
  return (
    <Modal
      footer={false}
      closable={false}
      visible={visible}
      centered={true}
      width={600}
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
        <Col span={24} className="mt-5">
          <FormItem>
            <Row>
              <Col span={24}>
                <SelectItem
                  isWrong={!isEmpty(errors?.isRtl) ? true : false}
                  help={errors?.isRtl}
                  defaultValue={translationId}
                  name="isRtl"
                  theme={theme}
                  placeholder=""
                  options={languagesList}
                  label={globalSettingTranslate["languages"]?.title}
                  onChange={(value) => {
                    console.log("value", value);
                    setTranslationId(value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} className="flex justify-end mt-10">
                <CustomeButton
                  onClick={onFinish}
                  text={globalSettingTranslate["save"]?.title}
                />
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
}
