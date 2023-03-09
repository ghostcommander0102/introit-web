import React from "react";
import { Button, Col, Row } from "antd";
import FormItem from "./form/FormItem";
import Styles from "/styles/scss/dashboard/AccountManagement.module.scss";
import Arrow from "/public/assets/images/svgs/arrow.svg";
import ArrowDark from "/public/assets/images/svgs/dark/arrow.svg";
import Deacticvation from "./Deacticvation";

import DeleteAccount from "./DeleteAccount";
export default function AccountManagement({
  theme,
  handleChangeTabAccount,
  accountTab,
  currentUser,
  handleDeActiveAccount,
  handleAccountDelete,
  mySettingsTranslate,
}) {
  //***************************
  // define Component
  //***************************
  const ArrowButton = ({ text, tab }) => {
    return (
      <Button
        onClick={() => handleChangeTabAccount(tab)}
        className={theme ? Styles.lightButton : Styles.darkButton}
      >
        <span>{text}</span>
        <span>{theme ? <Arrow /> : <ArrowDark />}</span>
      </Button>
    );
  };
  return (
    <FormItem>
      {accountTab == 0 ? (
        <Row className="md:px-2 pt-2 wrapper-account">
          <Col span={24} className="mb-1.5 item-account">
            <ArrowButton
              tab="1"
              text={mySettingsTranslate["create-new-company"]?.title}
            />
          </Col>
          <Col span={24} className="mb-1.5 item-account">
            <ArrowButton
              tab="2"
              text={mySettingsTranslate["temporarily-deactivation"]?.title}
            />
          </Col>
          <Col span={24} className="mb-1.5 item-account">
            <ArrowButton
              tab="3"
              text={mySettingsTranslate["delete-account"]?.title}
            />
          </Col>
        </Row>
      ) : accountTab == 2 ? (
        <Deacticvation
          mySettingsTranslate={mySettingsTranslate}
          handleDeActiveAccount={handleDeActiveAccount}
          theme={theme}
          currentUser={currentUser}
        />
      ) : accountTab == 3 ? (
        <DeleteAccount
          mySettingsTranslate={mySettingsTranslate}
          handleAccountDelete={handleAccountDelete}
          theme={theme}
          currentUser={currentUser}
        />
      ) : null}
    </FormItem>
  );
}
