import React from "react";
import { Input, Form, Col, Row, Button } from "antd";
import Styles from "/styles/scss/dashboard/SettingText.module.scss";
export default function SettingText({ icon, text, onClick, theme }) {
  return (
    <Row>
      <Col span={24}>
        <div className={theme ? Styles.lightWrapper : Styles.darkWrapper}>
          <p className={theme ? Styles.lightText : Styles.darkText}>{text}</p>
          <Button onClick={onClick} className={Styles.button}>
            {icon}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
