import React from "react";
import { Col, Row } from "antd";
import Divider from "/styles/scss/dashboard/Divider.module.scss";
export default function DividerItem({
  content,
  theme,
  count,
  hasCount = false,
  fontWeight,
}) {
  //***************************** */
  //define styles
  return (
    <Row>
      <Col className={hasCount ? "flex items-center" : ""} md={{ span: 24 }}>
        <p
          style={{ fontWeight: fontWeight }}
          className={theme ? Divider.dividerLight : Divider.dividerDark}
        >
          {content}
        </p>
        <span className={`md:block hidden ${Divider.count}`}>
          {hasCount ? count : null}
        </span>
      </Col>
    </Row>
  );
}
