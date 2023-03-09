import React from "react";
import { Col, Row } from "antd";
import Styles from "/styles/scss/dashboard/UserDetail.module.scss";
export default function Course({ title, date, theme }) {
  return (
    <Row className="py-6 px-8">
      <Col span={24}>
        <div>
          <div>
            <div className={theme ? Styles.lightBold : Styles.darkBold}>
              {title}
            </div>
          </div>
          <div className="pt-2">
            <div className={theme ? Styles.lightText : Styles.darkText}>
              {date}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
