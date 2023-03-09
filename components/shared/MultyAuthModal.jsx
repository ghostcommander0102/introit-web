import React from "react";
import { isEmpty } from "lodash";
import ImageProvider from "providers/ImageProvider";
import { Button, Modal, Col, Row } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import Styles from "/styles/scss/dashboard/MultyAuth.module.scss";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Duplicate from "/public/assets/images/svgs/duplicate-auth-icon.svg";
import DuplicateDark from "/public/assets/images/svgs/dark/duplicate-auth-icon.svg";
import ModalButton from "./ModalButton";
export default function MultyAuthModal({
  visible,
  handleClose,
  theme,
  multyAuth,
  handleDuplicate,
  handleEnableMultyAuth,
  myProfileTranslate = {},
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
      <Row className="mt-5">
        <Col span={24} className="text-center">
          <div className="mb-5">
            <span
              className={theme ? Styles.lightTextBold : Styles.darkTextBold}
            >
              {
                myProfileTranslate[
                  "scan-the-qr-code-with-your-google-authenticator-app"
                ]?.title
              }
            </span>
          </div>
        </Col>
        <Col span={24} className="text-center">
          {!isEmpty(multyAuth?.qr) ? (
            <ImageProvider width={200} height={200} src={multyAuth?.qr} />
          ) : (
            <ImageProvider
              width={200}
              height={200}
              src="/assets/images/svgs/code-icon.svg"
            />
          )}
        </Col>
        <Col span={24} className="text-center">
          <div className="mt-5">
            <span className={theme ? Styles.lightText : Styles.darkText}>
              {myProfileTranslate["or-copy-the-setup-key"]?.title}
            </span>
          </div>
        </Col>
        <Col
          span={24}
          className={`text-center mt-3 ${
            theme ? Styles.lightSetup : Styles.darkSetup
          }`}
        >
          <div className="flex justify-center">
            <div className="flex justify-center items-center">
              {!isEmpty(multyAuth?.key) ? (
                <p className="setup-key m-0">{multyAuth?.key}</p>
              ) : null}
            </div>
            <div>
              <Button onClick={handleDuplicate} className={Styles.button}>
                {theme ? <Duplicate /> : <DuplicateDark />}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="md:mt-5 md:mb-10">
        <ModalButton
          rightClick={handleEnableMultyAuth}
          theme={theme}
          leftText={myProfileTranslate["cancel"]?.title}
          rightText={myProfileTranslate["activate"]?.title}
        />
      </div>
    </Modal>
  );
}
