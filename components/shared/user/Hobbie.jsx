import { Col, Row } from "antd";
import React from "react";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function Hobbie({ text, theme }) {
  return (
    <Row className="pt-8 px-10">
      <Col span={24}>
        <div>
          <p className={theme ? Styles.lightTitle : Styles.darkTitle}>{text}</p>
        </div>
      </Col>
    </Row>
  );
}
