import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/ButtonMore.module.scss";
export default function ButtonMore({ text, icon, onClick }) {
  return (
    <Row>
      <Col span={24} className="text-center">
        <button className={Styles.button} onClick={onClick}>
          <span className="pr-2">{text}</span>
          {icon}
        </button>
      </Col>
    </Row>
  );
}
