import React from "react";
import { Modal, Button, Row, Col } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import TextItem from "../form/TextItem";
import FormItem from "../form/FormItem";
import CustomeButton from "../CustomeButton";
import { isEmpty } from "lodash";
export default function RoleModal({
  theme,
  visible,
  handleClose,
  handleCreateRole,
  inputsRole,
  setInputsRole,
  errors,
  isEditRole,
  handleEditRole,
  globalSettingTranslate = {},
}) {
  return (
    <Modal
      footer={false}
      closable={false}
      visible={visible}
      centered={true}
      width={700}
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
      <Row className="md:px-10 px-2 mt-5">
        <Col span={24}>
          <FormItem>
            <TextItem
              isWrong={!isEmpty(errors?.name) ? true : false}
              help={errors?.name}
              name="name"
              value={inputsRole?.name}
              onChange={setInputsRole}
              placeholder=""
              theme={theme}
              label={globalSettingTranslate["role-name"]?.title}
            />
            <div className="flex justify-end mt-10">
              <CustomeButton
                onClick={isEditRole ? handleEditRole : handleCreateRole}
                text={globalSettingTranslate["save"]?.title}
              />
            </div>
          </FormItem>
        </Col>
      </Row>
    </Modal>
  );
}
