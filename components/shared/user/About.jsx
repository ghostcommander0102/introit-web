import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function About({ text, theme }) {
  return (
    <Row className="pt-8 px-4">
      <Col span={24}>
        <p className={theme ? Styles.lightTitle : Styles.darkTitle}>{text}</p>
      </Col>
    </Row>
  );
}
