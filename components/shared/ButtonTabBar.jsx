import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/ButtonTabBar.module.scss";
import Tick from "/public/assets/images/svgs/green-tick-icon.svg";
export default function ButtonTabBar({
  text,
  handleChangeTab,
  tab,
  current,
  theme,
  active,
  lightIcon,
  activeLightIcon,
  darkIcon,
  activeDarkIcon,
  verifyed = false,
}) {
  return (
    <Row>
      <Col span={24}>
        <div
          onClick={handleChangeTab}
          className={`${theme ? Styles.wrapperLight : Styles.wrapperDark} ${
            tab == current
              ? theme
                ? Styles.lightActive
                : Styles.darkActive
              : ""
          }`}
        >
          <span className="flex">
            {active
              ? theme
                ? activeLightIcon
                : activeDarkIcon
              : theme
              ? lightIcon
              : darkIcon}
          </span>
          <span className={`${Styles.text}`}>{text}</span>
          {verifyed ? (
            <div className={Styles.verify}>
              <Tick />
            </div>
          ) : null}
        </div>
      </Col>
    </Row>
  );
}
