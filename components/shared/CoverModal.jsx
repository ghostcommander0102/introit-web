import React from "react";
import dynamic from "next/dynamic";
import { Button, Col, Modal, Row } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Styles from "/styles/scss/dashboard/CoverModal.module.scss";
const EditorCustome = dynamic(() => import("./EditorCustome"), {
  ssr: false,
});
export default function CoverModal({
  visible,
  handleClose,
  theme,
  translator,
  setDescription,
  value,
  onClick,
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
      <Row className="py-10 mx:px-10 px-2">
        <Col span={24}>
          <EditorCustome
            label={translator["cover-letter"]?.title}
            onChange={setDescription}
            value={value}
            theme={theme}
            name="description"
          />
        </Col>
        <Col span={24} className="md:flex hidden justify-end mt-10">
          <Button onClick={onClick} className={Styles.button}>
            {translator["save"]?.title}
          </Button>
        </Col>
      </Row>
      <Button onClick={onClick} className={Styles.button}>
        {translator["save"]?.title}
      </Button>
    </Modal>
  );
}
