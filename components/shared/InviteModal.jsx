import React from "react";
import { Modal, Button, Row, Col } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Styles from "/styles/scss/dashboard/InviteModal.module.scss";
import Duplicate from "/public/assets/images/svgs/duplicate-auth-icon.svg";
import DuplicateDark from "/public/assets/images/svgs/dark/duplicate-auth-icon.svg";
import EmailItem from "./form/EmailItem";
import FormItem from "./form/FormItem";
export default function InviteModal({
  theme,
  show,
  handleClose,
  inviteCode,
  handleDuplicate,
  layoutTranslate,
  setInviteInputs,
  inviteInputs,
  onFinish,
}) {
  return (
    <Modal
      footer={false}
      closable={false}
      visible={show}
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
      <Row className="px-2">
        <Col span={24}>
          <p className={theme ? Styles.lightText : Styles.darkText}>
            {layoutTranslate["invite-your-friends"]?.title}
          </p>
        </Col>
        <Col md={{ span: 18 }} span={24} className="mx-auto">
          <div>
            <FormItem onFinish={onFinish}>
              <EmailItem
                value={inviteInputs.email}
                onChange={setInviteInputs}
                name="email"
                label={
                  layoutTranslate["enter-your-friend's-email-address"]?.title
                }
                theme={theme}
              />
              <div>
                <Button htmlType="submit" className={Styles.buttonSend}>
                  {layoutTranslate["send"]?.title}
                </Button>
              </div>
            </FormItem>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}
