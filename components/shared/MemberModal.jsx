import React from "react";
import { Button, Modal, Col, Row } from "antd";
import Close from "/public/assets/images/svgs/close-icon.svg";
import ModalStyles from "/styles/scss/dashboard/Modal.module.scss";
import Styles from "/styles/scss/dashboard/MemberModal.module.scss";
import MemberRow from "./MemberRow";
import TextItemMobile from "./form/admin/TextItem";
import TextItem from "./form/TextItem";
import Search from "/public/assets/images/svgs/member-search.svg";
import FormItem from "./form/FormItem";
import SaveIcon from "/public/assets/images/svgs/save-icon.svg";
import MemberCard from "./MemberCard";
export default function MemberModal({
  visible,
  onClose,
  theme,
  members,
  setMebmerSearch,
  handleChangeRoleChecked,
  handleUpdateMemberRole,
  myRoleTranslate,
  isCardMember,
}) {
  return (
    <Modal
      footer={false}
      closable={false}
      visible={visible}
      centered={true}
      width={900}
      className={isCardMember ? "member-modal" : ""}
    >
      <div className="md:block hidden">
        <Button
          onClick={onClose}
          className={theme ? ModalStyles.lightClose : ModalStyles.darkClose}
        >
          <Close />
        </Button>
      </div>
      <div className="md:hidden block">
        <Button onClick={onClose} className={ModalStyles.mobileClose}>
          <Close />
        </Button>
      </div>
      <FormItem>
        <Row className="md:p-10 pt-5 px-2 md:pb-0 md:mx-10  flex justify-center items-center">
          <Col md={{ span: 20 }} span={20}>
            {isCardMember ? (
              <TextItemMobile
                name="name"
                onChange={setMebmerSearch}
                placeholder=""
                label={myRoleTranslate["name"]?.title}
                theme={theme}
                prefix={<Search />}
                heigth={34}
              />
            ) : (
              <TextItem
                name="name"
                onChange={setMebmerSearch}
                placeholder=""
                label={myRoleTranslate["name"]?.title}
                theme={theme}
                prefix={<Search />}
              />
            )}
          </Col>
          <Col
            md={{ span: 4 }}
            span={8}
            className="md:flex hidden items-center pl-4"
          >
            <Button className={Styles.button} onClick={handleUpdateMemberRole}>
              <span className={Styles.icon}>
                <SaveIcon />
              </span>
              {myRoleTranslate["add"]?.title}
            </Button>
          </Col>
          <Col span={4} className="md:hidden flex items-center pl-4">
            <Button
              className={Styles.miniButton}
              onClick={handleUpdateMemberRole}
            >
              <SaveIcon />
            </Button>
          </Col>
        </Row>
      </FormItem>
      {isCardMember ? (
        <Row>
          <Col span={24}>
            <MemberCard
              handleChangeRoleChecked={handleChangeRoleChecked}
              theme={theme}
              members={members}
              myRoleTranslate={myRoleTranslate}
            />
          </Col>
        </Row>
      ) : (
        <Row className="md:px-10 px-2 md:mx-10">
          <Col span={24}>
            <MemberRow
              myRoleTranslate={myRoleTranslate}
              handleChangeRoleChecked={handleChangeRoleChecked}
              theme={theme}
              members={members}
            />
          </Col>
        </Row>
      )}
    </Modal>
  );
}
